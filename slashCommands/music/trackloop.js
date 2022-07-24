const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "trackloop",
  description: "Toggles the Track-Loop",
  run: async (client, interaction, args, prefix) => {
    isMemberInVoiceChannel(interaction);
    checkOldConnection(interaction);

    const queue = client.queues.get(interaction.guild.id); // get the queue
    if (!queue) {
      return interaction
        .reply({ ephemeral: true, content: `👎 **Nothing playing right now**` })
        .catch(() => null);
    }
    if (queue.queueloop) queue.queueloop = false;

    // no new songs (and no current)
    queue.trackloop = !queue.trackloop;
    // skip the track

    return interaction
      .reply({
        ephemeral: false,
        content: `🔁 **Track-Loop is now \`${
          queue.trackloop ? "Enabled" : "Disabled"
        }\`**`,
      })
      .catch(() => null);
  },
};
