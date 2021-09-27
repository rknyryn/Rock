module.exports = {
	name: 'metin.kanalı.ekle',
	description: 'Sunucuya metin kanalı ekler. Kanal isimlerinde boşluk olmamalıdır!\n-c: Opsiyonel.',
	aliases: ['metin.ke'],
	usage: ['[kanal adı]'],
	cooldown: 4,
	async execute(message, args) {
		if (message.member.hasPermission("MANAGE_CHANNELS")) {
			args = args.join(" ").split(/ -c /);
			if (args.length > 1) {
				const givenCategory = message.client.channels.cache.find(
					(category) => category.name.toLowerCase() === args[1].toLowerCase()
				);

				if (!givenCategory || givenCategory.type !== 'category')
					return message.channel.send('Sunucuda böyle bir kategori yok!');

				chNames = args.join(" ").split(" ")
				chNames.forEach(chName => {
					message.guild.channels
						.create(chName, {
							type: "text",
						})
						.then((channel) => {
							channel.setParent(givenCategory)
						})
				});
			} else {
				chNames = args.join(" ").split(" ")
				chNames.forEach(chName => {
					message.guild.channels
						.create(chName, {
							type: "text",
						})
				});
			}
		} else {
			message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
		}
	},
};