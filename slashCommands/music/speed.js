const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "speed",
  description: "Changes the Speed of the Music",
  options: [
    {
      name: "playback_speed",
      description: "Speed % between 50 and 300 (100 = normal)",
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
      return interaction.reply({
        ephemeral: true,
        content: `👎 **Nothing playing right now**`,
      });
    }
    if (
      args[0] === undefined ||
      isNaN(args[0]) ||
      Number(args[0]) < 50 ||
      Number(args[0]) > 300
    )
      return interaction
        .reply({
          ephemeral: true,
          content: `👎 **No __valid__ Bassboost-Level between 50 and 300 % provided!** (100 % == normal speed)\n Usage: \`${prefix}speed 125\``,
        })
        .catch(() => null);
    const speed = Number(args[0]);
    queue.effects.speed = Math.floor(speed) / 100;

    // change the Basslevel
    queue.filtersChanged = true;
    const curPos =
      oldConnection.state.subscription.player.state.resource.playbackDuration;
    oldConnection.state.subscription.player.stop();
    oldConnection.state.subscription.player.play(
      client.getResource(queue, queue.tracks[0].id, curPos)
    );

    return interaction
      .reply({
        ephemeral: false,
        content: `🎚 **Successfully changed the Speed to \`${
          Math.floor(speed) / 100
        }x\` of the Original Speed (${speed}%)**`,
      })
      .catch(() => null);
  },
};
