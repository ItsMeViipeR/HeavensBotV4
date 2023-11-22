import { CommandInteraction, EmbedBuilder } from "discord.js";
import { HeavensBot } from "../client";

const help = {
  name: "help",
  description: "Gives you a list of commands.",
  permissions: null,
  category: "Info",
  dm: true,
  options: [],
  async run(client: HeavensBot, interaction: CommandInteraction) {
    const categories: string[] = [];
    client.commands.forEach((command) => {
      if (!categories.includes(command.category?.toString()! as never)) {
        categories.push(command.category?.toString()! as never);
      }
    });
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Help")
          .setDescription("Here is a list of commands.")
          .addFields(
            categories.map((category) => {
              return {
                name: category,
                value: client.commands
                  .filter((command) => command.category === category)
                  .map((command) => `\`${command.name}\``)
                  .join(", "),
              };
            })
          )
          .setColor("Random"),
      ],
    });
  },
};

export default help;
