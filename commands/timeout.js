const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time-out")
    .setDescription("Put a user in time-out")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
    .addUserOption(Option =>
      Option.setName("user")
        .setDescription(`The user to time out`)
        .setRequired(true)
    )
    .addStringOption(Option =>
      Option.setName("duration")
        .setDescription("The duration of the time-out")
        .addChoices(
          { name: "1 Minute", value: "60" },
          { name: "2 Minutes", value: "120" },
          { name: "5 Minutes", value: "300" },
          { name: "10 Minutes", value: "600" },
          { name: "15 Minutes", value: "900" },
          { name: "20 Minutes", value: "1200" },
          { name: "30 Minutes", value: "1800" },
          { name: "45 Minutes", value: "2700" },
          { name: "1 hour", value: "3600" },
          { name: "2 hours", value: "7200" },
          { name: "3 hours", value: "10800" },
          { name: "5 hours", value: "18000" },
          { name: "10 hours", value: "36000" },
          { name: "1 day", value: "86400" },
          { name: "2 days", value: "172800" },
          { name: "3 days", value: "259200" },
          { name: "5 days", value: "432000" },
          { name: "1 week", value: "604800" }
        )
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
    const duration = interaction.options.getString("duration");
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
          "I cannot time out this user, this could be because he either has a bigger role than me or is in a bigger position than me.",
        ephemeral: true,
      });
    if (interaction.member.id === timeMember.id)
      return await interaction.reply({
        content: "You can't time yourself out",
        ephemeral: true,
      });
    if (timeMember.permissions.has(PermissionsBitField.Flags.Administrator))
      return await interaction.reply({
        content: "You cannot time out a person who is an administrator",
        ephemeral: true,
      });

    await timeMember.timeout(duration * 1000, reason);

    const dmEmbed = new EmbedBuilder()
      .setTitle("You have been placed in time-out")
      .setDescription(
        `:white_check_mark: You have been timed out on ${interaction.guild.name}. You can check the status of your time-out in the server | ${reason}`
      )
      .setTimestamp()
      .setColor("DarkPurple");

    await timeMember.send({ embeds: [dmEmbed] }).catch(err => {
      return;
    });

    await interaction.reply({
      content: "User timed out",
      ephemeral: true,
    });
  },
};
