const BaseCommand = require('../../classes/BaseCommand');
const Client = require('../../classes/Unicron');
const { Message } = require('discord.js');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'sweep',
                description: 'Forcefully sweep cached data from the bot',
                permission: 'Bot Owner',
            },
            options: {
                cooldown: 3,
            }
        });
    }
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        message.channel.send(`Sweeping...`);
        client.forceSweep(!isNaN(args[0]) ? Number(args[0]) : 25);
    }
}