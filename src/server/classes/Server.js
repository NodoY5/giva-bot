const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const { promisify } = require('util');
const BaseEvent = require('../../classes/BaseEvent');
const Endpoint = require('./Endpoint');
const EventEmitter = require('events').EventEmitter;
const { ShardingManager, Guild } = require('discord.js');
const POSTManager = require('../../managers/POSTManager');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const helmet = require('helmet');

const {
    GuildDynamicVoice, GuildFilter, GuildLeave,
    GuildMember, GuildModeration, GuildSettings,
    GuildTags, GuildTicket, GuildVerification,
    GuildWelcome,
} = require('../../database/database');

const GuildDB = require('../../classes/Guild');

module.exports = class Server extends EventEmitter {
    /**
     * 
     * @param {ShardingManager} manager 
     */
    constructor(manager) {
        super();
        this.manager = manager;
        this.utils = require('../../utils/');
        this.logger = this.utils.Logger;
        this.wait = promisify(setTimeout);
        this.poster = new POSTManager(this, {});
        this.id = process.env.CLIENT_ID;
        this.models = {
            GuildDynamicVoice, GuildFilter, GuildLeave,
            GuildMember, GuildModeration, GuildSettings,
            GuildTags, GuildTicket, GuildVerification,
            GuildWelcome,
        };
    }
    /**
     * @returns {Promise<number>}
     * @param {"users"|"guilds"} props 
     */
    async getCount(props) {
        if (props === 'users') {
            const raw = await this.manager.broadcastEval(`this.guilds.cache.reduce((acc, cur) => acc + cur.memberCount, 0)`);
            return raw.reduce((acc, cur) => acc + cur, 0);
        } else if (props === 'guilds') {
            const raw = await this.manager.broadcastEval(`this.guilds.cache.size`);
            return raw.reduce((acc, cur) => acc + cur, 0);
        } return 0;
    }
    /**
     * @returns {Promise<Guild>}
     * @param {string} guild_id 
     */
    fetchGuild(guild_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const fetched = await this.manager.broadcastEval(`this.guilds.cache.get('${guild_id}');`);
                const guild = fetched.find(u => u);
                return resolve(guild ? guild : null);
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @returns {Promise<GuildDB>}
     * @param {string} guild_id 
     */
    fetchGuildDB(guild_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = new Map();
                for await (const model of Object.keys(this.models)) {
                    let value = await this.models[model].findOne({ where: { guild_id } });
                    if (!value) value = await this.models[model].create({ guild_id });
                    data.set(model, value);
                }
                const instance = new GuildDB(guild_id, data);
                return resolve(instance);
            } catch (e) {
                reject(e);
            }
        })
    }
    /**
     * @brief Register stufss
     * @param {string} path 
     */
    async register() {
        this.app = express();
        this.app.use(session({
            store: new MemoryStore({ checkPeriod: 86400000 }),
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        }));
        this.app.locals.domain = process.env.DOMAIN;
        this.app.use(helmet());
        this.app.use('/static', express.static(path.join(__dirname, '..', 'public')));
        this.app.set('views', path.join(__dirname, '..', 'views'));
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('view engine', 'html');
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        await this.registerRoutes('../routes');
        await this.registerEvents('../events');
    }
    /**
     * @private
     * @param {string} dir 
     */
    async registerRoutes(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for await (const file of files) {
            if (file.endsWith('.js')) {
                const endpoint = require(path.join(filePath, file));
                if (endpoint.prototype instanceof Endpoint) {
                    const instance = new endpoint(this);
                    this.app.use(instance.url, instance.createRoute());
                    continue;
                }
            }
        }
        this.app.get('/', (req, res) => {
            this.renderTemplate(req, res, 'index.ejs');
        });
        this.app.use((req, res) => {
            res.redirect('/404');
        });
    }
    /**
     * 
     * @param {express.request} req 
     * @param {express.response} res 
     * @param {string} template 
     * @param {Object<string, any>} data 
     */
    renderTemplate(req, res, template, data = {}) {
        const baseData = {
            path: req.path,
            user: req.isAuthenticated() ? req.user : null,
        };
        res.render(template, Object.assign(baseData, data));
    }
    /**
     * 
     * @param {express.request} req 
     * @param {express.response} res 
     * @param {function} next
     */
    Authentication(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/oauth/login');
    }
    /**
     * 
     * @param {string} dir 
     */
    async registerEvents(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const Event = require(path.join(filePath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const instance = new Event();
                    this.on(instance.eventName, instance.run.bind(instance, this));
                }
                delete require.cache[require.resolve(path.join(filePath, file))];
            }
        }
    }
    /**
     * 
     * @param {number} [port=4200]
     */
    login(port = 4200) {
        return new Promise(async (resolve, reject) => {
            try {
                this.port = port || 4200;
                this.app.listen(port, () => {
                    this.logger.info(`API Server Running on port ${this.port}`);
                });
                this.poster.startInterval();
                return resolve(port);
            } catch (e) {
                reject(e);
            }
        });
    }
}