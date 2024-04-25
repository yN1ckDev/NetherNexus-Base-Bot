const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("untime-out")
    .setDescription("Remove a timed out user")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
    .addUserOption(Option =>
      Option.setName("user")
        .setDescription(`The user to remove the time-out from`)
        .setRequired(true)
    )
    .addStringOption(Option =>
      Option.setName("reason")
        .setDescription("The reason for the time-out")
        .setRequired(false)
    ),
  async execute(interaction) {
    const timeUser = interaction.options.getUser("user");
    const timeMember = await interaction.guild.members.fetch(timeUser.id);
    let reason = interaction.options.getString("motivo") || "No reason given";

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return await interaction.reply({
        content: "You do not have permission to run this command",
      });
    if (!timeMember)
      return await interaction.reply({
        content: "The selected user is no longer on the server",
        ephemeral: true,
      });
    if (!timeMember.kickable)
      return await interaction.reply({
        content:
          "I cannot remove the time-out for this user, this could be because he either has a greater role than me or is in a greater position than me.",
        ephemeral: true,
      });
    if (interaction.member.id === timeMember.id)
      return await interaction.reply({
        content: "You can't take a time-out yourself",
        ephemeral: true,
      });
    if (timeMember.permissions.has(PermissionsBitField.Flags.Administrator))
      return await interaction.reply({
        content:
          "You cannot remove a time-out from a person who is an administrator",
        ephemeral: true,
      });

    await timeMember.timeout(null, reason);

    const dmEmbed = new EmbedBuilder()
      .setTitle("You've been untimed")
      .setDescription(
        `:white_check_mark: Your timeout has been **removed** | ${reason}`
      )
      .setTimestamp()
      .setColor("DarkRed");

    await timeMember.send({ embeds: [dmEmbed] }).catch(err => {
      return;
    });

    await interaction.reply({
      content: "User untimed out",
      ephemeral: true,
    });
  },
};
