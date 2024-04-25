const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  inlineCode,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("delete several messages in a channel")
    .setDMPermission(false)
    .addNumberOption(option =>
      option
        .setName("number")
        .setDescription("the number of messages to delete")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
    .setDMPermission(false),

  async execute(interaction, options) {
    const number = interaction.options.getNumber("number") || 100;
    const channel =
      interaction.guild.channels.cache.get(interaction.channel.id) ||
      interaction.channel;

    await interaction.deferReply({ ephemeral: true });

    await interaction.followUp({
      content: "Give me a few seconds...",
    });

    const embed = new EmbedBuilder()
      .setTitle("Action performed successfully!")
      .setDescription(`Deleted Messages: ${inlineCode(number)}`)
      .setColor("DarkRed");

    try {
      await channel.bulkDelete(number, true);
      return await interaction.channel
        .send({ embeds: [embed] })
        .then(message => {
          setTimeout(() => message.delete(), 5000);
        });
    } catch (error) {
      return console.log(error);
    }
  },
};
