module.exports = {
	name: 'geç',
	description: 'Bir sonraki şarkıya geçer.',
	cooldown: 4,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if(serverQueue != null && serverQueue.connection != null){
			if (!message.member.voice.channel) return message.channel.send('Ses kanalında olmalısınız!');
			else if (!serverQueue) return message.channel.send('Geçebileceğim şarkı yok!');
			serverQueue.connection.dispatcher.end();
		}else {
			message.reply("Listede şarkı yok!");
		}
	},
};