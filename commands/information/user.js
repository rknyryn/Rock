const Discord = require('discord.js');

module.exports = {
    name: 'bilgi',
    description: 'Sunucu bilgilerini gösterir.',
    aliases: ['bilgiler'],
    cooldown: 5,
    execute(message) {
        const user = message.mentions.users.first();
        const member = message.guild.members.cache.get(user.id)
        if (member){
            let embed = new Discord.MessageEmbed()
                .setColor('#f2e40c')
                .setAuthor(user.username, user.displayAvatarURL())
                .setThumbnail(message.guild.iconURL())
                .addFields(
                    {name: 'Durum', value: user.presence.status},
                    {name: 'Tag', value: user.tag, inline: true},
                    {name: 'Takma Ad', value: member.nickname, inline: true},
                    {name: 'Rol Sayısı', value: member.roles.cache.size -1, inline: true},
                    {name: 'Sunucuya Katıldığı Tarih', value: new Date(member.joinedTimestamp).toLocaleDateString()},
                    {name: 'Discorda Katıldığı Tarih', value: new Date(user.createdTimestamp).toLocaleDateString()}
                )
                .setTimestamp()
            message.channel.send(embed)
        }else{
            message.reply("Herhangi bir kullanıcı belirtmediniz.")
        }
    },
};