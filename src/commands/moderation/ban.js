const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
    MessageFlags
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("Bans a user from the guild.")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("The user you'd like you ban.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for banning the user.")
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
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
          .setDescription(`You cannot ban yourself.`)
          .setColor(0x1D6DA8);
  
        await interaction.reply({
          embeds: [errorEmbed],
          flags: MessageFlags.Ephemeral,
        });
      } else if (
        member.permissions.has(PermissionsBitField.Flags.ModerateMembers)
      ) {
        const errorEmbed2 = new EmbedBuilder()
          .setDescription(`You cannot ban a server moderator.`)
          .setColor(0x1D6DA8);
  
        await interaction.reply({
          embeds: [errorEmbed2],
          flags: MessageFlags.Ephemeral,
        });
      } else {
        const dmEmbed = new EmbedBuilder().setColor(0x1D6DA8).addFields([
          {
            name: `You have been banned from:`,
            value: `${interaction.guild.name}`,
          },
          {
            name: `Reason:`,
            value: `${reason}`,
          },
        ]);
  
        const displayEmbed = new EmbedBuilder()
          .setDescription(
            `**${userTarget.tag} has been banned** | ${reason}`
          )
          .setColor(0x1D6DA8);
  
        userTarget
          .send({
            embeds: [dmEmbed],
          })
          .catch((error) => {
            console.error(error);
          });

        await member
        .ban({
          deletedMessageDays: 1,
          reason: reason,
        })
        .catch((error) => {
          console.error(error);
        });

  
        await interaction.reply({
          embeds: [displayEmbed],
        });
      }
    },
  };
  