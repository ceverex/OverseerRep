const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
    MessageFlags
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Removes a user from the guild.")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("The user you'd like you kick.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for kicking the user.")
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction, client) {
      const userTarget = interaction.options.getUser("target");
      let reason = interaction.options.getString("reason");
      const member = await interaction.guild.members
        .fetch(userTarget.id)
        .catch(console.error);
//      const ceverexSuccess = client.emojis.cache.find(
//        (emoji) => (emoji.id = "1010038172589232131")
//      );
//      const ceverexError = client.emojis.cache.find(
//        (emoji) => (emoji.id = "1010038746927874078")
//      );
  
      if (!reason) reason = "No reason provided.";
  
      if (userTarget.id == interaction.user.id) {
        const errorEmbed = new EmbedBuilder()
          .setDescription(`You cannot kick yourself.`)
          .setColor(0x1D6DA8);
  
        await interaction.reply({
          embeds: [errorEmbed],
          flags: MessageFlags.Ephemeral,
        });
      } else if (
        member.permissions.has(PermissionsBitField.Flags.ModerateMembers)
      ) {
        const errorEmbed2 = new EmbedBuilder()
          .setDescription(
            `You cannot kick a server moderator.`
          )
          .setColor(0x1D6DA8);
  
        await interaction.reply({
          embeds: [errorEmbed2],
          flags: MessageFlags.Ephemeral,
        });
      } else {
        const dmEmbed = new EmbedBuilder().setColor(0x1D6DA8).addFields([
          {
            name: `You have been kicked from:`,
            value: `${interaction.guild.name}`,
          },
          {
            name: `Reason:`,
            value: `${reason}`,
          },
        ]);
  
        const displayEmbed = new EmbedBuilder()
          .setDescription(
            `**${userTarget.tag} has been kicked** | ${reason}`
          )
          .setColor(0x1D6DA8);
  
        userTarget
          .send({
            embeds: [dmEmbed],
          })
          .catch((error) => {
            console.error(error);
          });
  
        await member.kick(reason).catch(console.error);
  
        await interaction.reply({
          embeds: [displayEmbed],
        });
      }
    },
  };
  