const { REST } = require('@discordjs/rest')
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
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientId = "1447017659102265404";
    const guildId = "1444869008682913865";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log(`Started refreshing application (/) commands.`);

      // or do applicationCommands(clientId) without guildId
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
      console.log(error);
    }
  };
};
