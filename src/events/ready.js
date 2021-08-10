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
client.user.setActivity(`!help | Made By Aarav`, { type : "WATCHING" })
  }
};

// NOTE : Don't Remove the credits othervise this can get you in Copyright Issues
