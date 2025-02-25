const { MessageFlags } = require("discord.js");

module.exports = {
    data: {
      name: `deployment`,
    },
    async execute(interaction, client) {
      // Check if the user has administrator permissions
      if (interaction.member.permissions.has("ADMINISTRATOR")) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        await interaction.editReply({
          content: `Deployment started.`,
          flags: MessageFlags.Ephemeral,
        });
  
        const channelId = "1265921387198021693"; // deployment status channel
        const channel = await client.channels.fetch(channelId);

        console.log(`Found channel: ${channel}`);
        await channel.setName("Deployment: Active");

      } else {
        await interaction.editReply({
          content: `You do not have administrator permissions.`,
          flags: MessageFlags.Ephemeral,
        });
      }
    },
  };