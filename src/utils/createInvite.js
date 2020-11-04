
function createInvite() {
    const baseURL = `https://discordapp.com/oauth2/authorize?`
    return `${baseURL}client_id=${process.env.CLIENT_ID}&scope=bot&permissions=${process.env.CLIENT_PERMISSIONS}`
}

module.exports = createInvite;