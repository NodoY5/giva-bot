const Endpoint = require('../classes/Endpoint');

class Privacy extends Endpoint {
    constructor(app) {
        super('/privacy-policy', app);
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.client.renderTemplate(req, res, 'Privacy.ejs');
        });
        return this.route;
    }
}

module.exports = Privacy;