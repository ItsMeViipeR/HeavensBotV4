import { CommandInteraction, EmbedBuilder } from "discord.js";
import { HeavensBot } from "../client";
import moment from "moment-timezone";

const info = {
  name: "info",
  description: "Get information about the bot.",
  permissions: null,
  category: "Info",
  dm: false,
  options: [],
  async run(client: HeavensBot, interaction: CommandInteraction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Bot information")
          .setDescription("Here is some information about me.")
          .addFields(
            {
              name: "Name",
              value: client.user!.username,
              inline: true,
            },
            {
              name: "Tag",
              value: client.user!.tag,
              inline: true,
            },
            {
              name: "ID",
              value: client.user!.id,
              inline: true,
            },
            {
              name: "Created At",
              value: moment(client.user!.createdAt)
                .tz("Europe/Paris")
                .format("DD/MM/YYYY hh:mm"),
              inline: true,
            },
            {
              name: "Guilds",
              value: client.guilds.cache.size.toString(),
              inline: true,
            },
            {
              name: "Users",
              value: client.users.cache.size.toString(),
              inline: true,
            },
            {
              name: "Commands",
              value: client.commands.size.toString(),
              inline: true,
            },
            {
              name: "Ping",
              value: `${client.ws.ping}ms`,
              inline: true,
            },
            {
              name: "Version",
              value: "4.0.0",
              inline: true,
            }
          )
          .setColor("Random")
          .setTimestamp()
          .setFooter({
            text: `©️ ${
              new Date().getFullYear() === 2023
                ? 2023
                : `2023-${new Date().getFullYear()}`
            } ${client.user!.tag}`,
            iconURL: client.user!.displayAvatarURL(),
          }),
      ],
    });
  },
};

export default info;
