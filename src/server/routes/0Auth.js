const Endpoint = require('../classes/Endpoint');

const passport = require('passport');
const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URI,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
}));

class OAuth extends Endpoint {
    constructor(app) {
        super('/oauth', app);
    }
    createRoute() {
        this.client.app.use(passport.initialize());
        this.client.app.use(passport.session());
        this.route.get('/', (req, res) => {
            this.client.renderTemplate(req, res, 'OAuth.ejs');
        });
        this.route.get('/login', (req, res, next) => {
            next();
        }, passport.authenticate('discord', { failureRedirect: '/500' }));

        this.route.get('/logout', (req, res) => {
            this.client.logger.info(`(${req.user.username}#${req.user.discriminator}/${req.user.id}) has been logout!`);
            req.session.destroy(() => {
                req.logout();
                res.redirect('/');
            });
        });

        this.route.get('/callback', passport.authenticate('discord', { failureRedirect: '/500' }), (req, res) => {
            this.client.logger.info(`(${req.user.username}#${req.user.discriminator}/${req.user.id}) has been authenticated!`);
            res.redirect('/dashboard');
        });

        return this.route;
    }
}

module.exports = OAuth;