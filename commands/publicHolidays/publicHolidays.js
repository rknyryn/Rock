const Discord = require('discord.js');
const { API } = require('../../api/api')
const api = new API()

module.exports = {
    name: 'bayram.günleri',
    description: 'Aranan ülke ve yılın tatil günlerini gösterir.',
    aliases: ['bayram.g'],
    usage: ['[Ülke kodu(Örnek: TR)] [Yıl]'],
    cooldown: 5,
    execute(message, args) {
        api.get_publicHoliday(args[0], args[1])
            .then(data => {
                const embed = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle('Bayram Günleri')
                    .setTimestamp()

                data.forEach(d => {
                    embed.addField(this.name = d.localName, value = d.date, inline = true)
                })

                message.channel.send(embed);
            })
    },
};