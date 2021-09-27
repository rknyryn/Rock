const Discord = require('discord.js');
const { API } = require('../../api/api')
const api = new API()

module.exports = {
    name: 'hava.durumu',
    description: 'Hava durumunu gösterir.\nŞehir adı belirtilmez ise İstanbul\'un hava durumu gösterilir.',
    aliases: ['hava'],
    usage: ['[şehir adı]'],
    cooldown: 5,
    execute(message, args) {
        let city = "istanbul"
        if (args.length > 0)
            city = args.join(" ")

        api.get_weather(city)
            .then(data => {
                const embed = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle('Hava Durumu')
                    .setAuthor(data.location.region + '/' + data.location.country, 'https:' + data.current.condition.icon)
                    .addFields(
                        { name: 'Sıcaklık', value: data.current.temp_c + '°C'},
                        {name: 'Hissedilen Sıcaklık', value: data.current.feelslike_c + '°C'},
                        { name: 'Rüzgar', value: data.current.gust_kph + 'km/sa', inline: true },
                        { name: 'Basınç', value: data.current.pressure_mb + 'mb', inline: true },
                    )
                    .setTimestamp()

                message.channel.send(embed);
            })

    },
};