const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Embeds message.")
    .addStringOption((option) =>
        option
          .setName("embed_title")
          .setDescription("string")
          .setRequired(true)
      )
    .addStringOption((option) =>
        option
          .setName("message")
          .setDescription("string")
          .setRequired(true)
      ),
  async execute(interaction, client) {
    let embed_title = interaction.options.getString("embed_title");
    let message = interaction.options.getString("message");
    const embed = new EmbedBuilder()
      .setColor(process.env.embedColor) // 0x9522CE - ceverex, 0x1D6DA8
      .addFields([
        {
          name: `${embed_title}`,
          value: `${message}`,
          inline: true,
        }
      ])

    await interaction.reply({
      embeds: [embed],
    });
  },
};