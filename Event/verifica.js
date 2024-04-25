const { Events } = require("discord.js");
const { Verifyrole } = require("../config.json");

module.exports = {
  async code(client, Events, EmbedBuilder) {
    client.on(Events.InteractionCreate, async interaction => {
      if (interaction.customId === "verify") {
        await interaction.reply({
          content: "You have been verified",
          ephemeral: true,
        });
        var utente = interaction.guild.members.cache.get(interaction.user.id);

        await utente.roles.add(Verifyrole);
      }
    });
  },
};
