const { getVoiceConnection } = require("@discordjs/voice");
const { default: YouTube } = require("youtube-sr");
const { Permissions } = require("discord.js");
const { ConstantValues } = require("../../constants/constantValues");
const {
  isMemberInVoiceChannel,
  isMemberInVoiceChannelWithPermissions,
  checkOldConnection,
} = require("../../util/globalFunctions");
module.exports = {
  name: "playtop",
  description:
    "Plays Music in your Voice Channel and positions it to the queue top",
  options: [
    {
      name: "songtitle",
      description: "Title/Link of the Song/Playlist",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args, prefix) => {
    isMemberInVoiceChannel(interaction);
    isMemberInVoiceChannelWithPermissions(interaction);
    checkOldConnection(interaction);
    
    const queue = client.queues.get(interaction.guild.id); // get the queue
    if (!queue) {
      return interaction
        .reply({ ephemeral: true, content: `👎 **Nothing playing right now**` })
        .catch(() => null);
    }
    const track = args.join(" ");
    if (!args[0])
      return interaction
        .reply({
          ephemeral: true,
          content: `👎 Please add the wished Music via: \`${prefix}playtop <Name/Link>\``,
        })
        .catch(() => null);

    // variables for song, and playlist
    let song = null;
    let playlist = null;

    // Use the regex expressions
    const isYT = ConstantValues.regex.youtubRegex.exec(track);
    const isSong = ConstantValues.regex.songRegex.exec(track);
    const isList = ConstantValues.regex.playlistRegex.exec(track);

    try {
      // try to play the requested song
      await interaction
        .reply({ ephemeral: true, content: `🔍 *Searching **${track}** ...*` })
        .catch(() => null);
      // get song from the link
      if (isYT && isSong && !isList) {
        song = await YouTube.getVideo(track);
      }
      // get playlist from the link
      else if (isYT && !isSong && isList) {
        playlist = await YouTube.getPlaylist(track).then((playlist) =>
          playlist.fetch()
        );
      }
      // get playlist & song from the link
      else if (isYT && isSong && isList) {
        song = await YouTube.getVideo(
          ConstantValues.urls.youtubVideo + isSong[2]
        );
        playlist = await YouTube.getPlaylist(
          ConstantValues.urls.youtubPlaylist + isList[2]
        ).then((playlist) => playlist.fetch());
      }
      // otherwise search for it
      else {
        song = await YouTube.searchOne(track);
      }
      if (!song && !playlist)
        return interaction.editReply({
          ephemeral: true,
          content: `❌ **Failed looking up for ${track}!**`,
        });
      /* FOR NO PLAYLIST REQUESTS */
      if (!playlist) {
        // Add the song to the queue
        queue.tracks = [
          queue.tracks[0],
          client.createSong(song, interaction.user),
          ...queue.tracks.slice(1),
        ];
        // edit the loading interaction
        return interaction
          .editReply({
            ephemeral: false,
            content: `▶️ **Queued at \`1st\`: __${song.title}__** - \`${song.durationFormatted}\``,
          })
          .catch(() => null);
      } else {
        /* FOR PLAYLIST REQUEST */
        // get the song, or the first playlist song
        song = song ? song : playlist.videos[0];
        // remove the song which got added
        const index = playlist.videos.findIndex((s) => s.id == song.id) || 0;
        playlist.videos.splice(index, 1);
        const playlistSongs = [];
        // Add the playlist songs to the queue
        playlist.videos.forEach((song) =>
          playlistSongs.push(client.createSong(song, interaction.user))
        );
        queue.tracks = [
          queue.tracks[0],
          client.createSong(song, interaction.user),
          ...playlistSongs,
          ...queue.tracks.slice(1),
        ];
        // edit the loading interaction
        return interaction
          .editReply({
            ephemeral: false,
            content: `👍 **Queued at \`1st\`: __${song.title}__** - \`${
              song.durationFormatted
            }\`\n> **Added \`${
              playlist.videos.length - 1
            } Songs\` from the Playlist:**\n> __**${playlist.title}**__`,
          })
          .catch(() => null);
      }
    } catch (e) {
      console.error(e);
      return interaction
        .reply({
          ephemeral: true,
          content:
            `❌ Could not play the Song because: \`\`\`${
              e.interaction || e
            }`.substring(0, 1950) + `\`\`\``,
        })
        .catch(() => null);
    }
  },
};
