const Discord = require('discord.js');

module.exports = {
	name: 'merhaba',
	description: 'Merhaba mesajı döndürür!',
	aliases: ['mrb'],
	cooldown: 2,
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setAuthor(`Merhaba ${message.author.username} 👋`)
			
		message.reply(embed);
	},
};