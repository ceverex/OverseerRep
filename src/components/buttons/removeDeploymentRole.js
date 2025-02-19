const { MessageFlags } = require("discord.js");

module.exports = {
    data: {
      name: `stopDeployment`,
    },
    async execute(interaction, client) {
  
      // The role ID to grant
      const roleId = "1263246293481033890";
      const member = interaction.member;
  
      // Add the role to the member
      await member.roles.remove(roleId);
  
      await interaction.reply({
          content: `You stopped your deployment!`,
          flags: MessageFlags.Ephemeral,
        });
    },
  };
  