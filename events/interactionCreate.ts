import {
  CommandInteraction,
  EmbedBuilder,
  InteractionType,
  PermissionsBitField,
} from "discord.js";
import { HeavensBot } from "../client";

export default async function interactionCreate(
  client: HeavensBot,
  interaction: CommandInteraction
) {
  if (interaction.type === InteractionType.ApplicationCommand) {
    let command = (await import(`../commands/${interaction.commandName}`))
      .default;

    if (interaction.isAutocomplete()) {
      command.autocomplete(client, interaction, command.options);
    }

    if (interaction.guild) {
      let user = interaction.guild.members.cache.get(interaction.user.id)!;
      if (
        command.permission !== "Aucune" &&
        user.permissions.has(command.permission)
      ) {
        command.run(client, interaction, interaction.options);
      } else if (command.permission === "Aucune") {
        command.run(client, interaction, interaction.options);
      } else if (
        command.permission !== "Aucune" &&
        !user.permissions.has(command.permission)
      ) {
        let embed = new EmbedBuilder()
          .setTitle("You cannot do that!")
          .setDescription(
            `You don't have the permissions to execute this command. Required permission : ${new PermissionsBitField(
              command.permission
            )}`
          )
          .setColor("Red")
          .setTimestamp()
          .setFooter({
            text: `©️ ${client.user!.tag}`,
          });

        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } else {
      command.run(client, interaction, interaction.options);
    }
  }
}
