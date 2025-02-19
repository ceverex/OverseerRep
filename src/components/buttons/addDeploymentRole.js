const { MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: `startDeployment`,
  },
  async execute(interaction, client) {
    // The role ID to grant
    const roleId = "1263246293481033890";
    const member = interaction.member;

    // Add the role to the member
    await member.roles.add(roleId);

    await interaction.reply({
      content: `You have deployed!`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
