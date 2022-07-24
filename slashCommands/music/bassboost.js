const { getVoiceConnection } = require("@discordjs/voice");
const {
  isMemberInVoiceChannel,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "bassboost",
  args: ["bass", "bb"],
  description: "Changes the Bassboost Level of the Music",
  options: [
    {
      name: "gain_level",
      description: "Bassboost level between 0 and 20",
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
      Number(args[0]) < 0 ||
      Number(args[0]) > 20
    )
      return interaction
        .reply({
          ephemeral: true,
          content: `👎 **No __valid__ Bassboost-Level between 0 and 20 db provided!** Usage: \`${prefix}bassboost 6\``,
        })
        .catch(() => null);
    const bassboost = Number(args[0]);
    queue.effects.bassboost = bassboost;

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
        content: `🎚 **Successfully changed the Bassboost-Level to \`${bassboost}db\`**`,
      })
      .catch(() => null);
  },
};
