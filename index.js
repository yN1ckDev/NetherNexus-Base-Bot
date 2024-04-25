const {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  EmbedBuilder,
} = require("discord.js");
const { token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
  ],

  Partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.Reaction,
  ],
});

const eventPath = path.join(__dirname, "Event");
const eventFiles = fs
  .readdirSync(eventPath)
  .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventPath, file);
  const event = require(filePath);
  event.code(client, Events, EmbedBuilder);
}

module.exports = {
  client,
};

//========================================================================================================================================================================

client.login(token);
