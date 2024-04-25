const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify-panel")
    .setDescription("Send the verification panel")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addChannelOption(Option =>
      Option.setName("channel")
        .setDescription("The channel to send the panel to")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.reply({ content: "Panel sent!", ephemeral: true });
    var channel = interaction.options.getChannel("channel");

    var embed = new EmbedBuilder()
      .setTitle("Verify")
      .setDescription(
        `Hey to continue your journey in ${interaction.guild.name}, please verify using the button down there`
      )
      .setColor("Gold");

    var verifica = new ButtonBuilder()
      .setCustomId("verify")
      .setEmoji("<:Verified:1195103735387521105>")
      .setLabel("Verify!")
      .setStyle(ButtonStyle.Success);

    var bottoni = new ActionRowBuilder().addComponents(verifica);

    channel.send({ embeds: [embed], components: [bottoni] });
  },
};
