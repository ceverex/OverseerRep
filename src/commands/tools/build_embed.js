const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("build_embed")
    .setDescription("Embeds message.")
    .addStringOption((option) =>
      option.setName("channel_id").setDescription("string").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("embed_option").setDescription("string").setRequired(false)
    ),
  async execute(interaction, client) {
    let embed_option = interaction.options.getString("embed_option")
    let channel_id = interaction.options.getString("channel_id");
    const channelId = `${channel_id}`; // Replace 'YOUR_CHANNEL_ID' with your channel ID
    const channel = await client.channels.fetch(channelId);

    if (!channel) {
      return interaction.reply({
        content: "Error: Channel not found.",
      });
    }
    const universal_uniform_embed = new EmbedBuilder()
      .setTitle("Universal Uniform")
      .setDescription(
        "Links to the required uniform materials are as follows:"
      )
      .setColor(0x1d6da8)
      .addFields([
        {
          name: `Vest:`,
          value: `https://www.roblox.com/catalog/71900146160395/Vest`
        },
      ])
      .setImage('https://cdn.discordapp.com/attachments/1254552663446650930/1341626501380182016/information.png?ex=67b6ae8c&is=67b55d0c&hm=ec792b7cd2dc17d114d60e542e20b13c554c11f0aab6e0ef80799a04d0268472&');

    await interaction.reply({
      content: "Embed Sent",
    });

    const uniform_info_embed = new EmbedBuilder()
      .setTitle('Uniform Information')
      .setDescription('While members represent our group, we expect them to follow a few uniform rules to ensure the best possible outwards image of our group.')
      .setColor(0x1d6da8)
      .addFields([
        {
          name: `1.`,
          value: `Wear the uniform as listed`
        },
        {
          name: `2.`,
          value: `Use official group items only`
        },
        {
          name: `3.`,
          value: `Use proper skin tone colors (guide given in [#uniform-universal](https://discord.com/channels/1226091568612769872/1227733267789250570))`
        },
        {
          name: `4.`,
          value: `No unrealistic accessories`
        },
        {
          name: `5.`,
          value: `T-Shirts are not allowed`
        },
        {
          name: `Notice:`,
          value: `Breaking any of these rules will result in a WARNING being issued. Continued misconduct regarding the rules will result in a KICK from the group.`
        },
      ]);

    await channel.send({
      embeds: [uniform_info_embed],
    });

    setTimeout(() => interaction.deleteReply(), 5000);
  },
};
