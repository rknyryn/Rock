module.exports = {
    name: "banla",
    description: "Üyeyi atar",
    cooldown: 4,
    aliases: ["ban", "ebedi.tekme", "sınır.dışı"],
    usage: "@[üye adı/adları]",
    execute(message) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .ban({
                            reason: 'They were bad!',
                        })
                        .then(() => {
                            message.reply(`${user.tag} ebediyen köyüne gönderildi. Artık geri gelemez.`);
                        })
                        .catch(err => {
                            message.reply('I was unable to ban the member');
                            console.error(err);
                        });
                } else {
                    message.reply("Üyeyi İlahi bir güç koruyor 🧿.");
                }
            } else {
                message.reply("Üye belirtmediniz!");
            }
        } else {
            message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
        }
    },
};
