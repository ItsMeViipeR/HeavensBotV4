import { CommandInteraction, EmbedBuilder } from "discord.js";
import { HeavensBot } from "../client";

const help = {
  name: "help",
  description: "Gives you a list of commands.",
  permissions: null,
  category: "Info",
  dm: true,
  options: [
    {
      name: "category",
      description: "The category of the command.",
      type: "string",
      required: false,
    },
  ],
  async run(client: HeavensBot, interaction: CommandInteraction) {
    if (
      interaction.options.get("category") === null ||
      interaction.options.get("category") === undefined
    ) {
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
    } else {
      const category: string = interaction.options
        .get("category")!
        .value!.toString();

      if (
        category.toLowerCase() === "info" ||
        category.toLowerCase() === "moderation"
      ) {
        const commands = client.commands
          .filter(
            (command) =>
              command.category ===
              category.charAt(0).toUpperCase() + category.slice(1)
          )
          .map((command) => `\`${command.name}\``)
          .join(", ");
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Help")
              .setDescription(
                `Here is a list of commands in ${
                  category.charAt(0).toUpperCase() + category.slice(1)
                }.`
              )
              .addFields({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                value: commands,
              })
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
      }
    }
  },
};

export default help;
