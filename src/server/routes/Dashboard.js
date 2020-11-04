const Endpoint = require('../classes/Endpoint');
const { Permissions } = require('discord.js');

class Webhook extends Endpoint {
    constructor(app) {
        super('/dashboard', app);
    }
    createRoute() {
        this.route.use(this.client.Authentication);
        this.route.get('/', (req, res) => {
            const guilds = req.user.guilds.filter((g) => {
                const permissions = new Permissions(g.permissions);
                return permissions.has('MANAGE_GUILD');
            });
            this.client.renderTemplate(req, res, 'dashboard.ejs', { guilds });
        });
        this.route.get('/manage/:id', async (req, res) => {
            try {
                if (!req.params.id) return res.redirect('/dashboard');
                const guild = await this.client.fetchGuild(req.params.id);
                if (!guild) return res.redirect('/invite');
                const db = await this.client.fetchGuildDB(guild.id);
                this.client.renderTemplate(req, res, 'Manager.ejs', { guild, db });
            } catch (e) {
                this.client.logger.error(e);
                res.redirect('/500');
            }
        });
        this.route.post('/manage/:id', async (req, res) => {
            try {
                console.log(req.body);
                res.redirect(`/dashboard/manage/${req.params.id}`);
            } catch (e) {
                this.client.logger.error(e);
                res.redirect('/500');
            }
        });
        return this.route;
    }
}

module.exports = Webhook;