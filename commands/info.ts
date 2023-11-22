import { CommandInteraction } from "discord.js";
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
        {
          title: "Bot Information",
          fields: [
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
          ],
          color: 0x2f3136,
        },
      ],
    });
  },
};

export default info;
