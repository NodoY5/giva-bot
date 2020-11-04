const Endpoint = require('../classes/Endpoint');
const md = require('marked');

class ToS extends Endpoint {
    constructor(app) {
        super('/tos', app);
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.client.renderTemplate(req, res, 'ToS.ejs', { md });
        });
        return this.route;
    }
}

module.exports = ToS;