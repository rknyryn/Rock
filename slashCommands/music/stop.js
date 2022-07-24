const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "stop",
  description: "Stops playing and cleares the Queue",
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
    // no new songs (and no current)
    queue.tracks = [];
    // skip the track
    oldConnection.state.subscription.player.stop();

    return interaction
      .reply({
        ephemeral: false,
        content: `🛑 **Successfully stopped playing and cleared the Queue.**`,
      })
      .catch(() => null);
  },
};
