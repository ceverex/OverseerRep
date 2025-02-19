const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    PermissionsBitField
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("timeout")
      .setDescription("Puts a user in timeout.")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("The user you'd like to put in timeout.")
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("time")
          .setDescription("The timeout duration in minutes.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for putting the user in timeout.")
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {
      const userTarget = interaction.options.getUser("target");
      let reason = interaction.options.getString("reason");
      const time = interaction.options.getInteger("time");
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
          .setDescription(`You cannot put yourself in timeout.`)
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
            `You cannot put a server moderator in timeout.`
          )
          .setColor(0x1D6DA8);
  
        await interaction.reply({
          embeds: [errorEmbed2],
          flags: MessageFlags.Ephemeral,
        });
      } else {
        const dmEmbed = new EmbedBuilder().setColor(0x1D6DA8).addFields([
          {
            name: `You have been timed out in:`,
            value: `${interaction.guild.name}`,
          },
          {
            name: `Reason:`,
            value: `${reason}`,
          },
          {
            name: `Duration:`,
            value: `${time} minute(s)`,
          },
        ]);
  
        const displayEmbed = new EmbedBuilder()
          .setDescription(
            `**${userTarget.tag} has been timed out** | ${reason}`
          )
          .setColor(0x1D6DA8);
  
        userTarget
          .send({
            embeds: [dmEmbed],
          })
          .catch((error) => {
            console.error(error);
          });

          /**
           * .send({
           * embeds: [dmEmbed]
           * })
           * .catch(console.log("User's DMs are off."))
           */

        await member.timeout(time * 60 * 1000, reason).catch(console.error);
  
        await interaction.reply({
          embeds: [displayEmbed],
        });
      }
    },
  };
  