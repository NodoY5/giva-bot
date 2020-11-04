const Endpoint = require('../classes/Endpoint');

class s404 extends Endpoint {
    constructor(app) {
        super('/404', app);
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.client.renderTemplate(req, res, '404.ejs');
        });
        return this.route;
    }
}

module.exports = s404;