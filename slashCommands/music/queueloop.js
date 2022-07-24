const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "queueloop",
  description: "Toggles the Queue-Loop",
  run: async (client, interaction, args, prefix) => {
    isMemberInVoiceChannel(interaction);
    checkOldConnection(interaction);

    const queue = client.queues.get(interaction.guild.id); // get the queue
    if (!queue) {
      return interaction
        .reply({ ephemeral: true, content: `👎 **Nothing playing right now**` })
        .catch(() => null);
    }
    if (queue.trackloop) queue.trackloop = false;

    // no new songs (and no current)
    queue.queueloop = !queue.queueloop;
    // skip the track

    return interaction
      .reply({
        ephemeral: false,
        content: `🔂 **Queue-Loop is now \`${
          queue.queueloop ? "Enabled" : "Disabled"
        }\`**`,
      })
      .catch(() => null);
  },
};
