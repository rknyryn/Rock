const { getVoiceConnection } = require("@discordjs/voice");
const { isMemberInVoiceChannel, checkOldConnection } = require("../../util/globalFunctions");
module.exports = {
    name: "leave",
    description: "Leaves a Voice Channel and stops playing",
    run: async (client, interaction, args, prefix) => {
        try {
            isMemberInVoiceChannel(interaction);
            checkOldConnection(interaction);
        
            await client.leaveVoiceChannel(interaction.member.voice.channel);
            
            interaction.reply({ ephemeral: false, content:"👍 Left your VC!"}).catch(() => null);
        } catch(e) { 
            console.error(e);
            interaction.reply({ ephemeral: true, content:`❌ Could not join your VC because: \`\`\`${e.interaction || e}`.substring(0, 1950) + `\`\`\``}).catch(() => null);
        }
    },
};