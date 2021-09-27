const Discord = require('discord.js');
const { prefix } = require("../config.json");

module.exports = {
  name: "message",
  execute(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.args && !args.length) {
      return message.channel.send(
        `Herhangi bir argüman sağlamadın, ${message.author}!`
      );
    }

    const { cooldowns } = message.client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      if (timestamps.has(message.author.id)) {
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(
            `Lütfen ${
              command.name
            } komutunu yeniden kullanmadan önce ${timeLeft.toFixed(
              1
            )} saniye daha bekleyin.`
          );
        }
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("Oops komut çalıştırılırken bir sorun oldu.");
    }
  },
};
