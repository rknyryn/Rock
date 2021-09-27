const Discord = require('discord.js');

module.exports = {
    name: 'anket',
    description: 'Belirtilen kanalda, anket oluşturur.',
    aliases: ['anket.oluştur', 'anket.yap'],
    usage: ['#[kanal adı] [Anket açıklaması/sorusu] -t [Anket Başlığı]'],
    cooldown: 4,
    async execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let pollChannel = message.mentions.channels.first()
            args = args.join(" ").split(/ -t /)

            let pollTitle = args[1]

            let pollDescriptions = args[0].split(" ")
            pollDescriptions[0] = ""
            pollDescriptions = pollDescriptions.join(" ")

            let embed = new Discord.MessageEmbed()
                .setTitle('🗳️' + pollTitle + '🗳️')
                .setDescription(pollDescriptions)
                .setColor('YELLOW')
            let msgEmbed = await pollChannel.send(embed)
            await msgEmbed.react('✅')
            await msgEmbed.react('❎')
        }else {
            message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!")
        }
    },
};