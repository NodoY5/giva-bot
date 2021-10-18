const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'amongus',
                description: 'A Among Us Chat!!',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: '',
                donatorOnly: false,
                premiumServer: false,
            }
        });
        this.frames = [
            'Red : Where?',
            'Green : yay',
            'Yellow : What do you mean green?',
            'Blue : In Reactor',
            'Green : bruh, Sent by mistake',
            'Yellow : green is sus guys'
            'Red : ok',
            'Green : NOOOOO',
            'Green : Vote Yellow',
            'Yellow : Green',
            'Blue : Vote Green',
            'Green : NOOO',
            'Game : GREEN WAS NOT THE IMPOSTER',
            'YELLOW WINS!'
          ];
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const msg = await message.channel.send('Dead Body Reported!');
		for (const frame of this.frames) {
			await client.wait(750);
			await msg.edit(frame);
		}
		return msg;
    }
}
