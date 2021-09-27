module.exports = {
    name: 'taşı',
    description: 'Kanalı bir kategorinin altına taşır.',
    aliases: ['kanalı.taşı', 't'],
    usage: ['[kanal adı] [kategori adı]'],
    cooldown: 4,
    async execute(message, args) {
        args = args.join(" ").split(" ")
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            const givenCategory = message.client.channels.cache.find(
                (category) => category.name.toLowerCase() === args[args.length - 1].toLowerCase()
            );
            if (!givenCategory || givenCategory.type !== 'category')
                return message.channel.send('Sunucuda böyle bir kategori yok!');

            args[args.length - 1] = ""
            args.forEach(chName => {
                const givenChannel = message.client.channels.cache.find(
                    (channel) => channel.name.toLowerCase() == chName.toLowerCase()
                );
                if (!givenChannel || (givenChannel.type !== 'text' && givenChannel.type !== 'voice'))
                    return message.channel.send("Sunucuda böyle bir kanal yok!")

                givenChannel.setParent(givenCategory)
            });
        } else {
            message.reply("Bu eylemi gerçekleştirmek için gerekli izne sahip değilsiniz!");
        }
    },
};