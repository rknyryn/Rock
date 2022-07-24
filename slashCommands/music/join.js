const { getVoiceConnection } = require("@discordjs/voice");
const { Permissions } = require("discord.js");
const { isMemberInVoiceChannel, isMemberInVoiceChannelWithPermissions, checkOldConnection } = require("../../util/globalFunctions");
module.exports = {
    name: "join",
    description: "Joins a Voice Channel",
    run: async (client, interaction, args, prefix) => {
        try {
            isMemberInVoiceChannel(interaction);
            isMemberInVoiceChannelWithPermissions(interaction);
            checkOldConnection(interaction);
            
            await client.joinVoiceChannel(interaction.member.voice.channel);
            interaction.reply({ ephemeral: false, content:"🔗 **Joined your VC!**"}).catch(() => null);
        } catch(e) { 
            console.error(e);
            interaction.reply({ ephemeral: true, content:`❌ Could not join your VC because: \`\`\`${e.interaction || e}`.substring(0, 1950) + `\`\`\``}).catch(() => null);
        }
    },
};
