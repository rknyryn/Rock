const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "pause",
  description: "Pauses the current Track",
  run: async (client, interaction, args, prefix) => {
    isMemberInVoiceChannel(interaction);
    checkOldConnection(interaction);
    const oldConnection = getVoiceConnection(interaction.guild.id);

    const queue = client.queues.get(interaction.guild.id); // get the queue
    if (!queue) {
      return interaction
        .reply({ ephemeral: true, content: `👎 **Nothing playing right now**` })
        .catch(() => null);
    }
    // if already paused
    if (queue.paused)
      return interaction
        .reply({ ephemeral: true, content: `👎 **Track already paused**` })
        .catch(() => null);

    queue.paused = true;

    // skip the track
    
    oldConnection.state.subscription.player.pause();

    return interaction
      .reply({
        ephemeral: false,
        content: `⏸️ **Successfully paused the Track**`,
      })
      .catch(() => null);
  },
};
