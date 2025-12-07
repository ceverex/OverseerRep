const { ActivityType } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} has logged in.`);
        client.user.setPresence({
            activities: [
              {
                name: `YouTube`,
                type: ActivityType.Watching,
              },
            ],
            status: "online",
          });
    }
}