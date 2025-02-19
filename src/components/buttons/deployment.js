const { MessageFlags } = require("discord.js");

module.exports = {
    data: {
      name: `deployment`,
    },
    async execute(interaction, client) {
      // Check if the user has administrator permissions
      if (interaction.member.permissions.has("ADMINISTRATOR")) {
        await interaction.reply({
          content: `Deployment started.`,
          flags: MessageFlags.Ephemeral,
        });
  
        const channelId = "1265921387198021693"; // deployment status channel
        const channel = await client.channels.fetch(channelId);
        await channel
        .setName("Deployment: Active")
        .then((newChannel) =>
          console.log(`Channel's new name is ${newChannel.name}`)
        )
        .catch(console.error);
        console.log(`Found channel: ${channel}`);
      } else {
        await interaction.reply({
          content: `You do not have administrator permissions.`,
          flags: MessageFlags.Ephemeral,
        });
      }
    },
  };