module.exports = {
  name: "at",
  description: "Üyeyi atar",
  cooldown: 4,
  aliases: ['tekmele', 'şutla'],
  usage: '@[üye adı/adları]',
  execute(message) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      const users = message.mentions.users
      users.forEach(user => {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick("")
            .then(() => {
              message.reply(`${user.tag} köyüne geri gönderildi`);
            })
            .catch((err) => {
              message.reply("Üyeyi İlahi bir güç koruyor 🧿.");
              console.error(err);
            });
        } else {
          message.reply("Bu kanalda öyle bir üye yok!");
        }
      });
    } else {
      message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
    }
  },
};
