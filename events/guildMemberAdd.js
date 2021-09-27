module.exports = {
    name: 'guildMemberAdd',
    execute(client) {
        const channel = client.guild.channels.cache
            .filter(f => f.type == "text")
            .first();
        if (!channel) return;
        channel.send(`🎉🎉 ${client.user.username}, Sunucuya hoşgeldin 🎉🎉`);
    }
}