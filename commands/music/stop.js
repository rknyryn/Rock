 
module.exports = {
	name: 'çık',
	description: 'Tüm şarkıları durdurur!',
	aliases: ['çıkar'],
	cooldown: 4,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue != null && serverQueue.connection != null) {
			if (!message.member.voice.channel) return message.channel.send('Ses kanalında olmasınız!');
			serverQueue.songs = [];
			serverQueue.connection.dispatcher.end();
		} else {
			message.reply("Zaten şarkı çalınmıyor!");
		}
	},
};