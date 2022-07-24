const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "skip",
  description: "Skips the current Track",
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
    if (!queue.tracks || queue.tracks.length <= 1) {
      return interaction
        .reply({ ephemeral: true, content: `👎 **Nothing to skip**` })
        .catch(() => null);
    }
    queue.skipped = true;
    // skip the track
    oldConnection.state.subscription.player.stop();

    return interaction
      .reply({
        ephemeral: false,
        content: `⏭️ **Successfully skipped the Track**`,
      })
      .catch(() => null);
  },
};
