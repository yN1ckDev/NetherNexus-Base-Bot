const { ActivityType, Collection } = require("discord.js");
const { guildId } = require("../config.json");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  async code(client, Events, EmbedBuilder) {
    client.on(Events.ClientReady, () => {
      let status = [
        {
          name: "dsc.gg/NetherNexus",
          type: ActivityType.Watching,
        },
        {
          name: "Base Version",
          type: ActivityType.Watching,
        },
        {
          name: "Buy the premium .gg/NetherNexus",
          type: ActivityType.Watching,
        },
      ];

      setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setPresence({
          activities: [status[random]],
          status: "online",
        });
      }, 10000);
      console.log(`${client.user.tag} online!`);

      // Cerca la cartella commands e trova i file .js al suo interno

      client.commands = new Collection();
      const commandsPath = path.join(__dirname, "../commands");
      const commandsFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));

      var commandsList = [];

      for (const file of commandsFiles)
        commandsList.push(path.join(commandsPath, file));

      registerCommands(commandsList);
    });

    const commandsFunctions = new Map();
    const menuFunctions = new Map();
    const buttonFunctions = new Map();
    const modalFunctions = new Map();

    function deleteCommands() {
      client.application.commands.fetch().then(commands => {
        commands.forEach(command => {
          if (!Array.from(commandsFunctions.values()).includes(command.id)) {
            client.application.commands.delete(command);
          }
        });
      });
      console.log("Comandi caricati!");
    }

    function registerCommands(commands) {
      if (commands.length == 0) {
        deleteCommands();
        return;
      }
      var command = require(commands[0]);

      client.application.commands
        .create(command.data)
        .then(interaction => {
          commandsFunctions.set(command.execute, interaction.id);
        })
        .finally(() => {
          commands.shift();
          registerCommands(commands);
        });
    }

    client.on(Events.InteractionCreate, interaction => {
      if (interaction.isChatInputCommand()) {
        commandsFunctions.forEach((id, funzione) => {
          if (interaction.command != null && id == interaction.command.id) {
            funzione(interaction, client, Events);
          }
        });
      } else if (interaction.isStringSelectMenu()) {
        menuFunctions.forEach((id, funzione) => {
          if (id === interaction.component.customId) {
            funzione(interaction);
          }
        });
      } else if (interaction.isButton()) {
        buttonFunctions.forEach((id, funzione) => {
          if (id === interaction.customId) {
            funzione(interaction);
          }
        });
      } else if (interaction.isModalSubmit()) {
        modalFunctions.forEach((id, funzione) => {
          if (id === interaction.customId) {
            funzione(interaction);
          }
        });
      }
    });
  },
};
