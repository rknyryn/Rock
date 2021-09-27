const Discord = require('discord.js');

module.exports = {
	name: 'ne.çalıyor',
	description: 'Çalan şarkının adını gösterir',
    aliases: ['çalan.şarkı', 'şarkı.adı', 'şarkı.ne'],
    cooldown: 4,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Şarkı çalmıyor.');
		const embed = new Discord.MessageEmbed()
            .setAuthor(`Çalan şarkı: ${serverQueue.songs[0].title}`)
		return message.channel.send(embed);
	},
};