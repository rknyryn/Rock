const { youtube_key } = require('../../config.json')
const Discord = require('discord.js');
const ytdl = require('ytdl-core')
const youtubeSearch = require('youtube-search')

const opts = (youtubeSearch.YoutubeSearchOptions) = {
    maxResults: 1,
    key: youtube_key
}

module.exports = {
    name: 'çal',
    description: 'Ses kanalında müzik çalar.',
    aliases: ['ç', 'oynat', 'o', 'tıngırdat'],
    usage: ['[şarkı adı]'],
    cooldown: 4,
    async execute(message, args) {

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send(
                "Ses kanalında olmalısınız!"
            );
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "Yeterli izne sahip değilsiniz!"
            );
        }

        const queue = message.client.queue;
        const serverQueue = message.client.queue.get(message.guild.id);
        args = args.join(" ")

        let results = await youtubeSearch(args, opts).catch(err => console.log(err))
        let songInfo = results.results.map(item => [item.title, item.link])

        const song = {
            title: songInfo[0][0],
            url: songInfo[0][1]
        };

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                this.play(message, queueConstruct.songs[0]);
            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(
                `${song.title} sıraya eklendi!`
            );
        }
    },

    
    play(message, song) {
        const queue = message.client.queue;
        const guild = message.guild;
        const serverQueue = queue.get(message.guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
                serverQueue.songs.shift();
                this.play(message, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Çalan şarkı: ${song.title}`)
        serverQueue.textChannel.send(embed);
    }
};