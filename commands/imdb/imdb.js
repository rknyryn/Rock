const Discord = require('discord.js');
const {API} = require('../../api/api')
const api = new API()

module.exports = {
    name: 'imdb',
    description: 'IMDB üzerinden bilgileri getirir.',
    usage: ['[dizi/film adı]'],
    cooldown: 5,
    async execute(message, args) {
        let movie = await api.get_movieID(args.join(" "))
        await api.get_movieDetails(movie.imdbID)
            .then(m => {
                const embed = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle(m.Title)
                    .setDescription(m.Plot)
                    .setThumbnail(m.Poster)
                    .addFields(
                        {name: 'Çıkış Yılı', value: m.Year, inline: true},
                        {name: "IMDb Puanı", value: m.imdbRating, inline: true},
                        {name: 'Süre', value: m.Runtime, inline: true},
                        {name: 'Tür', value: m.Genre, inline: true},

                        {name: 'Yönetmenler', value: m.Director, inline: true},
                        {name: 'Yazarlar', value: m.Writer, inline: true},

                        {name: 'Oyuncular', value: m.Actors},
                        {name: 'Ödüller', value: m.Awards},

                        {name: 'Ülkeler', value: m.Country, inline: true},
                        {name: 'Diller', value: m.Language, inline: true},
                        {name: 'Yapım', value: m.Production, inline: true},
                        {name: 'Gişe', value: m.BoxOffice, inline: true},

                    )
                    .setTimestamp()
                
                message.channel.send(embed)
            })
    },
};