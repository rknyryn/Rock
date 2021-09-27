const {API} = require('../../api/api')
const api = new API()

module.exports = {
    name: 'köpek',
    description: 'Köpek!',
    aliases: ['hav', 'kuçu', 'kuçu.kuçu', 'köpüş', 'it'],
    cooldown: 4,
    async execute(message) {
        api.get_dogImage()
            .then(data => {
                message.channel.send(data)
            })
    },
};