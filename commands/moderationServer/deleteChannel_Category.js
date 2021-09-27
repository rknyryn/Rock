module.exports = {
	name: 'kanalı.sil',
	description: 'Sunucudan metin kanalı veya kategori siler.',
	aliases: ['kanal.sil', 'kategori.sil', 'sil.kanal', 'sil.kategori', 'kat.sil'],
	usage: ['[kanal adı/adları] veya [kategori adı/adları]'],
	cooldown: 4,
	async execute(message, args) {
		if (message.member.hasPermission("MANAGE_CHANNELS")) {
			args.forEach(chName => {
				const givenChannel = message.client.channels.cache.find(
					(channel) => channel.name.toLowerCase() == chName.toLowerCase()
				);
				if (!givenChannel)
					return message.reply("Böyle bir kanal yok!")

				givenChannel.delete()
			});
		} else {
			message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
		}
	},
};