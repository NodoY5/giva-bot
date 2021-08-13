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
  const activities = [
    { name: 'your commands', type: 'LISTENING' },
    { name: 'to Aarav for Changes!!', type: 'LISTENING' },
    { name: '!help', type: 'LISTENING' }
  ];

  // Update presence
  client.user.setPresence({ status: 'dnd', activity: activities[0] });

  let activity = 1;

  // Update activity every 30 seconds
  setInterval(() => {
    activities[2] = { name: `${client.guilds.cache.size} servers`, type: 'WATCHING' }; // Update server count
    activities[3] = { name: `${client.users.cache.size} users`, type: 'WATCHING' }; // Update user count
    if (activity > 3) activity = 0;
    client.user.setActivity(activities[activity]);
    activity++;
  }, 30000);
  }
};

// NOTE : Don't Remove the credits othervise this can get you in Copyright Issues
