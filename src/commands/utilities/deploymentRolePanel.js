const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("send-deployment-panel-public")
      .setDescription("PUBLIC DEPLOYMENT PANEL")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
      const channelId = "1256353515391946915" // public deployment channel
      const channel = await client.channels.fetch(channelId);
  
      const deployButton = new ButtonBuilder()
        .setCustomId("startDeployment")
        .setLabel("Start")
        .setStyle(ButtonStyle.Success);
  
      const cancelButton = new ButtonBuilder()
        .setCustomId("stopDeployment")
        .setLabel("Stop")
        .setStyle(ButtonStyle.Danger);
  
      const actionRow = new ActionRowBuilder()
        .addComponents(deployButton, cancelButton);
  
      await interaction.reply({
        content: 'Prompt sent.'
      });
  
      await channel.send({
        content: 'Toggle your deployment status.', components: [actionRow],
      });
  
      setTimeout(() => interaction.deleteReply(), 5000);
    },
  };