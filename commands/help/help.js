const { prefix } = require('../../config.json');

module.exports = {
    name: 'yardım',
    description: 'Tüm komutların listesi.',
    aliases: ['komutlar'],
    usage: '[komut adı]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('\`\`\`Tüm komutlar:');
            data.push("-" + commands.map(command => command.name).join('\n-'));
            data.push(`\nBelirli bir komut hakkında bilgi almak için: ${prefix}yardım [komut adı] gönderebilirsiniz!\`\`\``);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Size tüm komutlarımı içeren bir DM gönderdim!');
                })
                .catch(error => {
                    console.error(`${Message.author.tag} adresine yardım DM gönderilemedi.\n`, error);
                    message.reply('Görünüşe göre size DM gönderemem! DM\'leriniz devre dışı mı?');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Bu geçerli bir komut değil!');
        }

        data.push(`\`\`\`Komut: ${command.name}`);

        if (command.aliases) data.push(`Takma Adlar: ${command.aliases.join(', ')}`);
        if (command.description) data.push(`Açıklama: ${command.description}`);
        if (command.usage) data.push(`Kullanım: ${prefix}${command.name} ${command.usage}`);

        data.push(`Bekleme Süresi: ${command.cooldown || 3} saniye(sn)\`\`\``);

        message.reply(data, { split: true });
    },
};