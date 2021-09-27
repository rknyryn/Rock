module.exports = {
    name: 'sesini.aç',
    description: 'Üyenin mikrafonunu açar',
    aliases: ['sesi.aç', 'ses.aç'],
    cooldown: 4,
    usage: '@[üye adı/adları]',
    execute(message) {
        if (message.member.hasPermission("MUTE_MEMBERS")) {
            const users = message.mentions.users
            users.forEach(user => {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .voice.setMute(false)
                        .then(() => {
                            message.reply(`${user.tag} sesi açıldı.`);
                        })
                        .catch(err => {
                            message.reply('Üyeyi İlahi bir güç koruyor 🧿.');
                            console.error(err);
                        });
                } else {
                    message.reply("Bu kanalda öyle bir üye yok!");
                }
            });
        }else{
            message.reply('Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!');
        }
    }
}