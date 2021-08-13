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
    { name: '!help', type: 'LISTENING' },
    { name: 'Made BY Aarav Mehta', type: 'WATCHING' },
    { name: 'with 100+ Users!', type: 'PLAYING' },
    { name: 'my new website | https://giva-bot.vercel.app/', type: 'WATCHING' },
    { name: 'my source code | https://github.com/NodoY5/giva-bot/', type: 'WATCHING' }
  ];

  // Update presence
  client.user.setPresence({ status: 'dnd', activity: activities[0] });

  let activity = 1;

  // Update activity every 30 seconds
  setInterval(() => {
    activities[2] = { name: `${await client.getCount('guilds')} servers!`, type: 'WATCHING' }; // Update server count
    activities[3] = { name: `${await client.getCount('users')} users!`, type: 'WATCHING' }; // Update user count
    if (activity > 3) activity = 0;
    client.user.setActivity(activities[activity]);
    activity++;
  }, 30000);
  }
};

// NOTE : Don't Remove the credits othervise this can get you in Copyright Issues
