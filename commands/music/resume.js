module.exports = {
	name: 'devam',
	description: 'Tüm şarkıları durdurur!',
	aliases: ['devamke'],
    cooldown: 4,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if(serverQueue != null && serverQueue.connection != null){
			if (!message.member.voice.channel) return message.channel.send('Ses kanalında olmasınız!');
			serverQueue.connection.dispatcher.resume();
		}else{
			message.reply("Herhangi bir şarkı yok!");
		}
	},
};