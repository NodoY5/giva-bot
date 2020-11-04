const Endpoint = require('../classes/Endpoint');

class s403 extends Endpoint {
    constructor(app) {
        super('/403', app);
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.client.renderTemplate(req, res, '403.ejs');
        });
        return this.route;
    }
}

module.exports = s403;