const { getVoiceConnection } = require("@discordjs/voice");
const { isMemberInVoiceChannel, checkOldConnection } = require("../../util/globalFunctions");
module.exports = {
  name: "shuffle",
  description: "Shuffles (mixes) the Queue",
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
    queue.tracks = shuffleArray(queue.tracks);

    // shuffled the Queue
    return interaction
      .reply({
        ephemeral: true,
        content: `🔀 **Successfully shuffled the Queue.**`,
      })
      .catch(() => null);
  },
};

function shuffleArray(a) {
  let cI = a.length,
    rI;
  while (cI != 0) {
    rI = Math.floor(Math.random() * cI);
    cI--;
    [a[cI], a[rI]] = [a[rI], a[cI]];
  }
  return a;
}
