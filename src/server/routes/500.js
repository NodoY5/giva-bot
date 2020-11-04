const Endpoint = require('../classes/Endpoint');

class s500 extends Endpoint {
    constructor(app) {
        super('/500', app);
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.client.renderTemplate(req, res, '500.ejs');
        });
        return this.route;
    }
}

module.exports = s500;