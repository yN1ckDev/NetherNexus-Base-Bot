const { Events } = require("discord.js");
const { JoinChannel, guildId } = require("../config.json");

module.exports = {
  async code(client, Events, EmbedBuilder) {
    client.on("guildMemberAdd", member => {
      const channel = member.guild.channels.cache.get(JoinChannel);
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle(`Welcome!`)
        .setColor(`#00FF00`)
        .setImage()
        .setFooter({
          text: "NetherNexus Shop",
          iconURL: "https://i.imgur.com/i6tM5Lr.png",
        })
        .setDescription(
          `Hi! <@${member.user.id}>,\nWelcome to **NetherNexus**!`
        )
        .setThumbnail(member.user.displayAvatarURL());

      channel.send({ embeds: [embed] });
    });
  },
};
