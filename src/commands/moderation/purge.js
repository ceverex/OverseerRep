const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("purge")
      .setDescription("Purges command in the channel specified.")
      .addChannelOption((option) =>
        option
          .setName("channel")
          .setDescription("The channel you want to purge messages in")
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("number")
          .setDescription("The number of messages you want to purge.")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction, client) {
      const channelToPurge = interaction.options.getChannel("channel");
      const amountToPurge = interaction.options.getInteger("number");
  
      const purgeSuccessEmbed = new EmbedBuilder()
        .setDescription(`Purge Successful!`)
        .setColor(0x1D6DA8)
        .addFields([
          {
            name: `Channel:`,
            value: `${channelToPurge}`,
          },
          {
            name: `Amount of Messages:`,
            value: `${amountToPurge}`,
          },
        ]);
  
      await channelToPurge.bulkDelete(amountToPurge, true);
      await interaction.reply({
        embeds: [purgeSuccessEmbed],
      });

      setTimeout(() => interaction.deleteReply(), 10000);
    },
  };
  