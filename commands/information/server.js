const Discord = require('discord.js');

module.exports = {
	name: 'sunucu',
	description: 'Sunucu bilgilerini gösterir.',
	aliases: ['sunucu.bilgi'],
	cooldown: 5,
	execute(message) {
		const roleList = message.guild.roles.cache.array().map(role => {
			return role.name;
		});
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#f2e40c')
			.setTitle(message.guild.name)
			.setURL(message.guild.iconURL())
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setDescription(message.guild.description)
			.setThumbnail(message.guild.iconURL())
			.addField("Sunucu Sahibi", message.guild.owner.user.username)
			.addField('Üye Sayısı', message.guild.memberCount, true)
			.addField('Bölge', message.guild.region, true)
			.addField('Roller', roleList, true)
			.addField('Üye Sayısı', message.guild.members.cache.array().length, true)
			.setTimestamp()
		//.setFooter('Footer');

		message.channel.send(exampleEmbed);
	},
};