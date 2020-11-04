const Endpoint = require('../classes/Endpoint');
const createInvite = require('../../utils/createInvite');

class Invite extends Endpoint {
    constructor(app) {
        super('/invite', app);
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            res.redirect(createInvite('/dashboard'));
        });
        return this.route;
    }
}

module.exports = Invite;