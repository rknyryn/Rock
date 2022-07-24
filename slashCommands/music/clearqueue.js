const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "clearqueue",
  description: "Cleares the Queue",
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
    queue.tracks = [queue.tracks[0]];
    // skip the track

    return interaction
      .reply({
        ephemeral: false,
        content: `🪣 **Successfully cleared the Queue.**`,
      })
      .catch(() => null);
  },
};
