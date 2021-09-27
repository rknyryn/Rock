const {API} = require('../../api/api')
const api = new API()

module.exports = {
	name: 'kedi',
	description: 'Kedi!',
    aliases: ['meow', 'pisi', 'pisi.pisi'],
    cooldown: 4,
    async execute(message) {
        api.get_catImage()
            .then(data => {
                message.channel.send(data)
            })
    },
};