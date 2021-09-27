module.exports = {
	name: 'temizle',
	description: 'Metin kanalındaki mesajları siler.',
	aliases: ['sil', 'mesaj.sil'],
	usage: ['[mesaj sayısı]'],
	cooldown: 4,
	async execute(message, args) {
		if (message.member.hasPermission("MANAGE_MESSAGES")) {
			let deleteCount = 0;
			try {
				deleteCount = parseInt(args[0])
			} catch (err) {
				return message.reply('Silinecek mesaj sayısını belirtin. (maksimum 100)')
			}

			if (!deleteCount || deleteCount < 2 || deleteCount > 200)
				return message.reply('Lütfen 2 ile 200 arasında bir sayıda mesaj silmeyi deneyiniz');

			const fetched = await message.channel.messages.fetch({
				limit: deleteCount,
			});
			message.channel.bulkDelete(fetched)
				.catch(error => message.reply(`Bu mesajı silemezsiniz: ${error}`));
		}else{
			message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
		}
	},
};