module.exports = {
    name: 'sağırlaştır',
    description: 'Üyeyi sağırlaştırır',
    cooldown: 4,
    usage: '@[üye adı/adları]',
    execute(message) {
        if (message.member.hasPermission("DEAFEN_MEMBERS")) {
            const users = message.mentions.users
            users.forEach(user => {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .voice.setDeaf(true)
                        .then(() => {
                            message.reply(`${user.tag} sağırlaştırıldı.`);
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