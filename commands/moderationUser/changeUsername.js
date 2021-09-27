module.exports = {
    name: 'takma.adını.değiştir',
    description: 'Üyeyenin kullanıcı adını değiştirir.',
    aliases: ['takma.adı.d', 'takma.ad', 'takma.ad', 'takma.adı.d', 'takma.a.değiştir'],
    usage: ['@[üye adı] [takma adı]'],
    cooldown: 4,
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const user = message.mentions.users.first()
            const member = message.guild.members.cache.get(user.id)

            args.shift()
            const nickname = args.join(" ")
            member.setNickname(nickname)

            message.reply("Takma adı değiştirdiniz")
        } else {
            message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!")
        }
    },
};