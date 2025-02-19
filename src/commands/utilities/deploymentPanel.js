const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("send-deployment-panel-admin")
      .setDescription("ADMIN DEPLOYMENT PANEL")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
      const channelId = "1265908377968709643"
      const channel = await client.channels.fetch(channelId);
  
      const deployButton = new ButtonBuilder()
        .setCustomId("deployment")
        .setLabel("Start")
        .setStyle(ButtonStyle.Success);
  
      const cancelButton = new ButtonBuilder()
        .setCustomId("cancelDeployment")
        .setLabel("Stop")
        .setStyle(ButtonStyle.Danger);
  
      const actionRow = new ActionRowBuilder()
        .addComponents(deployButton, cancelButton);
  
      await interaction.reply({
        content: 'Prompt sent.'
      });
  
      await channel.send({
        content: 'Deployment Panel', components: [actionRow],
      });
  
      setTimeout(() => interaction.deleteReply(), 5000);
    },
  };