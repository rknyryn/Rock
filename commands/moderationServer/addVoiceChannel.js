module.exports = {
  name: "ses.kanalı.ekle",
  description: "Sunucuya ses kanalı ekler. Kanal isimlerinde boşluk olmamalıdır!\n-c: Opsiyonel.",
  aliases: ['ses.kanalı.oluştur', 'ses.ke'],
  usage: ["[kanal adı/adları] -c [kategori adı]"],
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
              type: "voice",
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
              type: "voice",
            })
        });
      }
    } else {
      message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
    }
  },
};
