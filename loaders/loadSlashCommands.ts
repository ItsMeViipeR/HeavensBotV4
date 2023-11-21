import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { HeavensBot } from "../client";
import { readdirSync } from "fs";

export default async function loadSlashCommands(client: HeavensBot) {
  let commands = readdirSync("./commands").filter((f) => f.endsWith(".ts"));

  for (let command of commands) {
    let client_command = (await import(`../commands/${command}`)).default;

    if (!client_command.name || typeof client_command.name !== "string")
      throw new Error("Command has no name or its name isn't a string.");

    client.commands.set(client_command.name, client_command);
  }

  let client_commands: SlashCommandBuilder[] = [];

  client.commands.forEach(async (command) => {
    let slashCommand = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description)
      .setDMPermission(command.dm)
      .setDefaultMemberPermissions(
        command.permissions === null ? null : command.permissions
      );

    command.options?.forEach((option: any) => {
      switch (option.type) {
        case "string":
          slashCommand.addStringOption((command_option) =>
            command_option
              .setName(option.name)
              .setDescription(option.description)
              .setRequired(option.required)
          );
          break;
        case "user":
          slashCommand.addUserOption((command_option) =>
            command_option
              .setName(option.name)
              .setDescription(option.description)
              .setRequired(option.required)
          );
          break;
      }
    });

    client_commands.push(slashCommand);

    console.log(`Loaded ${command.name} slash command.`);
  });

  const rest = new REST({ version: "10" }).setToken(process.env.PROD_TOKEN!);

  await rest
    .put(Routes.applicationCommands(client.user!.id), {
      body: client_commands,
    })
    .then(() => {
      console.log("Slash commands loaded!");
    });
}
