const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the network")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
    .addUserOption(Option =>
      Option.setName("user")
        .setDescription(`The user to be banned from the network`)
        .setRequired(true)
    )
    .addStringOption(Option =>
      Option.setName("reason").setDescription("The reason for the ban")
    ),
  async execute(interaction, options) {
    const target = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    const log = interaction.guild.channels.cache.get(canalelog);
    if (!reason) {
      reason = "No reason specified";
    }

    await interaction.reply({
      content: `${target.username} was banned successfully!`,
      ephemeral: true,
    });
    await interaction.guild.members.ban(target);
  },
};
