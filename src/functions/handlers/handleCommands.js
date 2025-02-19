const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file in commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command, command.data.toJSON());
      }
    }

    const clientId = "1226727719945895986";
    const guildId = "1226091568612769872";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log(`Started refreshing application (/) commands.`);

      await rest.put(Routes.applicationCommands(clientId), {
        // applicationGuildCommands ... clientId, guildId
        body: client.commandArray,
      });

      console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
      console.log(error);
    }
  };
};
