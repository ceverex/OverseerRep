const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("remove_timeout")
      .setDescription("Removes a user from timeout.")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("The user you'd like to remove from timeout.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for removing the user from timeout.")
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
      const user = interaction.options.getUser("target");
      let reason = interaction.options.getString("reason");
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);
//      const ceverexSuccess = client.emojis.cache.find(
//        (emoji) => (emoji.id = "1010038172589232131")
//      );
//      const ceverexError = client.emojis.cache.find(
//        (emoji) => (emoji.id = "1010038746927874078")
//      );
  
      if (!reason) reason = "No reason provided.";
  
      if (!member.isCommunicationDisabled()) {
        const notInTimeout = new EmbedBuilder()
          .setDescription(`User is not in timeout.`)
          .setColor(0x1D6DA8);
        await interaction.reply({
          embeds: [notInTimeout],
          flags: MessageFlags.Ephemeral,
        });
      } else {
        const dmEmbed = new EmbedBuilder().setColor(0x1D6DA8).addFields([
          {
            name: `You have been removed from timeout in:`,
            value: `${interaction.guild.name}`,
          },
          {
            name: `Reason:`,
            value: `${reason}`,
          },
        ]);
  
        const displayEmbed = new EmbedBuilder()
          .setDescription(
            `**${user.tag} has been removed from timeout** | ${reason}`
          )
          .setColor(0x1D6DA8);
  
        user
          .send({
            embeds: [dmEmbed],
          })
          .catch((error) => {
            console.error(error);
          });
  
        await member.timeout(null, reason).catch(console.error);
  
        await interaction.reply({
          embeds: [displayEmbed],
        });
      }
    },
  };
  