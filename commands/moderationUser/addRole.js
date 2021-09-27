module.exports = {
    name: 'rol.ekle',
    description: 'Üyeye rol ekler',
    aliases: ['rol.e'],
    usage: ['@[üye adı/adları] [rol adı]'],
    cooldown: 4,
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const role = message.guild.roles.cache.find(role => role.name === args[args.length -1]);
            const members = message.mentions.members;
            members.forEach(member => {
                member.roles.add(role);
                message.channel.send(`${member.user.username} artık bir ${role.name}`)
            });
        } else {
            message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!")
        }
    },
};