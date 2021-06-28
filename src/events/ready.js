const Client = require("../classes/Unicron");
const BaseEvent = require("../classes/BaseEvent");
module.exports = class extends BaseEvent {
  constructor() {
    super("ready");
  }
  /*
   *
   * @param {Client} client
   */
  async run(client) {
    client.forceSweep(70);
    client.startSweepInterval();
client.user.setActivity(`My New Website!! | https://giva-bot.vercel.app/ `, { type : "WATCHING" })
  }
};

//LOL
