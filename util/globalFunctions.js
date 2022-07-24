const { Permissions } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  isMemberInVoiceChannel: function (interaction) {
    if (!interaction.member.voice.channelId)
      return interaction
        .reply({
          ephemeral: true,
          content: "👎 **Please join a Voice-Channel first!**",
        })
        .catch(() => null);
  },

  isMemberInVoiceChannelWithPermissions: function (interaction) {
    if (
      !interaction.member.voice.channel
        ?.permissionsFor(interaction.guild?.me)
        ?.has(Permissions.FLAGS.CONNECT)
    ) {
      return interaction
        .reply({
          ephemeral: true,
          content:
            "👎 **I'm missing the Permission to Connect to your Voice-Channel!**",
        })
        .catch(() => null);
    }
    if (
      !interaction.member.voice.channel
        ?.permissionsFor(interaction.guild?.me)
        ?.has(Permissions.FLAGS.SPEAK)
    ) {
      return interaction
        .reply({
          ephemeral: true,
          content:
            "👎 **I'm missing the Permission to Speak in your Voice-Channel!**",
        })
        .catch(() => null);
    }
  },

  checkOldConnection: function (interaction) {
    const oldConnection = getVoiceConnection(interaction.guild.id);
    if (
      oldConnection &&
      oldConnection.joinConfig.channelId != interaction.member.voice.channelId
    )
      return interaction
        .reply({
          ephemeral: true,
          content: "👎 **We are not in the same Voice-Channel**!",
        })
        .catch(() => null);
  },
};
