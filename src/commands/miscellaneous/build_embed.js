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
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
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
  
    if (embed_option == "rules") {
      const rules_embed = new EmbedBuilder()
      .setTitle('Rules')
      //.setDescription('While members represent our group, we expect them to follow a few uniform rules to ensure the best possible outwards image of our group.')
      .setColor(process.env.embedColor)
      .addFields([
        {
          name: `1.`,
          value: `No racism, homophobia, sexism, or discrimination of any kind`
        },
        {
          name: `2.`,
          value: `No NSFW content in any channel`
        },
        {
          name: `3.`,
          value: `No short links or IP grabbers`
        },
        {
          name: `4.`,
          value: `Do not excessively mention other members`
        },
        {
          name: `5.`,
          value: `No excessive vulgar language`
        },
        {
          name: `6.`,
          value: `Abide by Discord's Terms of Service and Community Guidelines`
        },
        {
          name: `Notice:`,
          value: `Breaking any of these rules will result in an immediate KICK and BLACKLIST from the group.`
        },
      ]);

    await channel.send({
      embeds: [rules_embed],
    });
    } else if (embed_option == "welcome") {
      const welcome_embed = new EmbedBuilder()
      .setTitle('Welcome to the Biosphere Sovereignty Corps!')
      .setDescription('You are currently under active observation until further notice. Your rank will be assigned shortly.')
      .setColor(process.env.embedColor)

      await channel.send({
      embeds: [welcome_embed],
    });
    } else if (embed_option == "loadout") {
      const loadout_embed = new EmbedBuilder()
      .setColor(process.env.embedColor)
      .addFields([
        {
          name: `BDU W/O Gloves:`,
          value: `https://www.roblox.com/catalog/85658084539930/Uniform`
        },
        {
          name: `BDU W/ Gloves:`,
          value: `https://www.roblox.com/catalog/83698216274347/Uniform`
        },
        {
          name: `Universal Bottoms:`,
          value: `https://www.roblox.com/catalog/127620274145103/Universal`
        },
      ]);

      await channel.send({
      embeds: [loadout_embed],
    });
    } else {
      return interaction.reply({
        content: "Error: Invalid embed option.",
      });
    }
    await interaction.reply({
      content: "Embed Sent",
    });

    setTimeout(() => interaction.deleteReply(), 5000);
  },
};
