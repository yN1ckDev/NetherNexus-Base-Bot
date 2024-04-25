const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick un untente dal network")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
    .addUserOption(Option =>
      Option.setName("user")
        .setDescription(`The user to kick from the network`)
        .setRequired(true)
    )

    .addStringOption(Option =>
      Option.setName("reason").setDescription("The reason for the kick")
    ),

  async execute(interaction, options) {
    const target = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    const log = interaction.guild.channels.cache.get(canalelog);
    if (!reason) {
      reason = "No reason given";
    }

    await interaction.reply({
      content: `${target.username} was banned successfully!`,
      ephemeral: true,
    });

    await interaction.guild.members.kick(target);
  },
};
