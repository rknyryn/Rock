const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "remove",
  description: "Removes a specific Track from the Queue",
  options: [
    {
      name: "position",
      description: "Song Position to remove",
      type: "INTEGER",
      required: true,
    },
  ],
  run: async (client, interaction, args, prefix) => {
    isMemberInVoiceChannel(interaction);
    checkOldConnection(interaction);

    const queue = client.queues.get(interaction.guild.id); // get the queue
    if (!queue) {
      return interaction
        .reply({ ephemeral: true, content: `👎 **Nothing playing right now**` })
        .catch(() => null);
    }
    // no new songs (and no current)
    if (!queue.tracks || queue.tracks.length <= 1) {
      return interaction.reply(`👎 **Nothing to skip**`).catch(() => null);
    }
    if (!args[0] || isNaN(args[0]) || Number(args[0]) > queue.tracks.length)
      return interaction.reply({
        ephemeral: true,
        content: `👎 **There are just ${
          queue.tracks.length
        } Songs in the Queue, can't remove the ${
          !isNaN(args[0]) ? client.queuePos(Number(args[0])) : args[0]
        } Song.**`,
      });

    queue.skipped = true;

    queue.tracks.splice(args[0], 1);

    return interaction
      .reply({
        ephemeral: false,
        content: `⏭️ **Successfully removed the ${client.queuePos(
          Number(args[0])
        )} Track!**`,
      })
      .catch(() => null);
  },
};
