module.exports = {
    name: 'sustur',
    description: 'Üyenin mikrofonunu kapatır.',
    cooldown: 4,
    aliases: ['sesini.kes', 'ses.kes'],
    usage: '@[üye adı/adları]',
    execute(message) {
        if (message.member.hasPermission("MUTE_MEMBERS")) {
            const users = message.mentions.users
            users.forEach(user => {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .voice.setMute(true)
                        .then(() => {
                            message.reply(`${user.tag} sesi kesildi`);
                        })
                        .catch(err => {
                            message.reply('Üyeyi İlahi bir güç koruyor 🧿.');
                            console.error(err);
                        });
                } else {
                    message.reply("Bu kanalda öyle bir üye yok!");
                }
            });
        } else {
            message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
        }
    }
}