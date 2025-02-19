const { MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: `cancelDeployment`,
  },
  async execute(interaction, client) {
    // Check if the user has administrator permissions
    if (interaction.member.permissions.has("ADMINISTRATOR")) {
      await interaction.reply({
        content: `Deployment stopped.`,
        ephemeral: true,
      });

      const channelId = "1265921387198021693"; // deployment status channel
      const channel = await client.channels.fetch(channelId);

      console.log(`Found channel: ${channel}`);
      await channel
        .setName("Deployment: Inactive")
        .then((newChannel) =>
          console.log(`Channel's new name is ${newChannel.name}`)
        )
        .catch(console.error);
    } else {
      await interaction.reply({
        content: `You do not have administrator permissions.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
