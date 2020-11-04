
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'emoji',
                description: 'Get a random Emoji',
                permission: 'User',
            },
            options: {
                aliases: ['moji'],
                cooldown: 15,
            }
        });
        this.emojis = [
            '( ͡° ͜ʖ ͡°)', '¯\\_(ツ)_/¯', 'ʕ•ᴥ•ʔ', '(▀̿Ĺ̯▀̿ ̿)', '(ง ͠° ͟ل͜ ͡°)ง',
            'ಠ_ಠ', "̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿", '[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]', "﴾͡๏̯͡๏﴿ O'RLY?",
            '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]', '(ᵔᴥᵔ)', '(¬‿¬)', '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)', '(づ￣ ³￣)づ',
            'ლ(ಠ益ಠლ)', 'ಠ╭╮ಠ', '♪~ ᕕ(ᐛ)ᕗ', 'ヾ(⌐■_■)ノ♪', '◉_◉', '\\ (•◡•) /',
            '༼ʘ̚ل͜ʘ̚༽', '┬┴┬┴┤(･_├┬┴┬┴', 'ᕦ(ò_óˇ)ᕤ', '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',
            '（╯°□°）╯︵( .o.)', 'ಠ‿↼', '◔ ⌣ ◔', '(ノಠ益ಠ)ノ彡┻━┻',
            '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)', "̿ ̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿", '(;´༎ຶД༎ຶ`)', '♥‿♥',
            'ᕦ(ò_óˇ)ᕤ', '(•_•) ( •_•)>⌐■-■ (⌐■_■)', '⌐╦╦═─ ಠ_ಠ , (¬‿¬)',
            '˙ ͜ʟ˙', ":')", '(°ロ°)☝', 'ಠ⌣ಠ', '(；一_一)', '( ⚆ _ ⚆ )',
            '☜(⌒▽⌒)☞', "(ʘᗩʘ')", '¯\\(°_o)/¯', 'ლ,ᔑ•ﺪ͟͠•ᔐ.ლ',
            '(ʘ‿ʘ)', 'ಠ~ಠ', 'ಠ_ಥ', 'ಠ‿↼', '(>ლ)', '(ღ˘⌣˘ღ)',
            'ಠoಠ', 'ರ_ರ', '◔ ⌣ ◔', '(✿´‿`)', 'ب_ب', '┬─┬﻿ ︵ /(.□. ）',
            '☼.☼', '^̮^', '(>人<)', '>_>', '(/) (°,,°) (/)', '(･.◤)', '=U',
            '~(˘▾˘~)', '| (• ◡•)| (❍ᴥ❍ʋ)',
        ];
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        return message.channel.send(this.emojis[Math.floor(Math.random() * this.emojis.length)]);
    }
}