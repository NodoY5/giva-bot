module.exports = {
    APIKeys: {
        glennbotlist: process.env.GLENN_TOKEN || '',
        arcane: process.env.ARCANE_TOKEN || '',
        mythicalbots: process.env.MYTHICAL_TOKEN || '',
        listmybots: process.env.LMB_TOKEN || '',
        discordboats: process.env.BOAT_TOKEN || '',
        botsfordiscord: process.env.BFD_TOKEN || '',
        topgg: process.env.TOPGG_TOKEN || '',
        botsondiscord: process.env.BOD_TOKEN || '',
        discordbotsgg: process.env.DBG_TOKEN || '',
        discordbotlist: process.env.DBL_TOKEN || '',
    },
    BotLists: {
        glennbotlist: {
            token: process.env.GLENN_TOKEN,
            endpoint: 'http://glennbotlist.xyz/api/bot/:id/stats',
            /**
             * 
             * @param {number} a
             * @param {number} b
             */
            parse: function (a, b) {
                return {
                    serverCount: a,
                    shardCount: b,
                }
            }
        },
        arcane: {
            token: process.env.ARCANE_TOKEN,
            endpoint: 'http://arcane-botcenter.xyz/api/:id/stats',
            /**
             * 
             * @param {number} a
             * @param {number} b
             * @param {number} c
             */
            parse: function (a, b, c) {
                return {
                    server_count: a,
                    shard_count: b,
                    member_count: c,
                }
            }
        },
        listmybots: {
            token: process.env.LMB_TOKEN,
            endpoint: 'http://listmybots.com/api/bot/:id',
            /**
             * 
             * @param {number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                    count: a,
                }
            }
        },
        discordboats: {
            token: process.env.BOAT_TOKEN,
            endpoint: 'http://discord.boats/api/bot/:id',
            /**
             * 
             * @param {number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                }
            }
        },
        botsfordiscord: {
            token: process.env.BFD_TOKEN,
            endpoint: 'http://botsfordiscord.com/api/bot/:id',
            /**
             * 
             * @param {number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                }
            }
        },
        topgg: {
            token: process.env.TOPGG_TOKEN,
            endpoint: 'http://top.gg/api/bots/:id/stats',
            /**
             * 
             * @param {number} a
             */
            parse: function (a) {
                return {
                    server_count: a,
                }
            }
        },
    },
}