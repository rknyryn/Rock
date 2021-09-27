module.exports = {
    name: "kategori.oluştur",
    description: "Sunucuya kategori ekler. Kategori adlarında boşluk olmamalıdır!",
    aliases: ['kategori.ekle', 'kat.ekle', 'kat.e', 'kategori.e'],
    usage: ["[kategori adı]"],
    cooldown: 4,
    async execute(message, args) {
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            categoryName = args.join(" ").trim();
            message.guild.channels
                .create(categoryName, {
                    type: "category",
                    permissionsOverwrites: [{
                        id: message.guild.id,
                        deny: ['MANAGE_MESSAGES'],
                        allow: ['SEND_MESSAGES']
                    }]
                })
        } else {
            message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
        }
    },
};
