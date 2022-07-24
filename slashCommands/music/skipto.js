const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "skipto",
  description: "Skips to a specific Track in the Queue",
  options: [
    {
      name: "position",
      description: "To what track you want to skip?",
      type: "INTEGER",
      required: true,
    },
  ],
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
    if (!args[0] || isNaN(args[0]) || Number(args[0]) > queue.tracks.length)
      return interaction.reply({
        ephemeral: true,
        content: `👎 **There are just ${queue.tracks.length} Songs in the Queue, can't skip to ${args[0]}th Song.**`,
      });

    queue.skipped = true;

    // if there is a queueloop: remove the current track but keep the rest
    if (queue.queueloop) {
      for (let i = 1; i <= args[0] - 1; i++) queue.tracks.push(queue.tracks[i]);
    }
    queue.tracks = queue.tracks.slice(args[0] - 1);

    // skip the track
    oldConnection.state.subscription.player.stop();

    return interaction
      .reply({
        ephemeral: false,
        content: `⏭️ **Successfully skipped ${args[0]} Track(s)**`,
      })
      .catch(() => null);
  },
};
