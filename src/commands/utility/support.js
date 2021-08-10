
const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'support',
                description: 'Shows Support Server, Invite link.',
                permission: 'User',
            },
            options: {
                aliases: ['invite'],
                clientPermissions: ['EMBED_LINKS'],
                cooldown: 3,
                nsfwCommand: false,
                args: false,
                usage: '',
                donatorOnly: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        const OWNER = await client.users.fetch(client.unicron.owner, false);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setTitle('Giva Bot')
            .setDescription(`
[Support Server](https://discord.gg/B6jqKDbWwU)
[Invite to your server](https://discord.com/oauth2/authorize?client_id=764096286202265630&scope=bot&permissions=285599830)`)
            .setFooter(`Made by »»» 𝗔𝗔𝗥𝗔𝗩 𝗠𝗘𝗛𝗧𝗔 `)
        );
    }
}
