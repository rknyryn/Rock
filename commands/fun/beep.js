module.exports = {
	name: 'beep',
	description: 'Beep!',
	cooldown: 3,
	execute(message) {
		message.reply("Boop");
	},
};