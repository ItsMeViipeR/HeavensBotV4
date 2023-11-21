import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { HeavensBot } from "../client";
import { readdirSync } from "fs";

interface CommandOption {
  name: string;
  description: string;
  type: string;
  required: boolean;
  autocomplete: boolean;
}

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

    if (command.options.length >= 1) {
      command.options.forEach((command_option: CommandOption) => {
        if (command_option.type === "string")
          slashCommand.addStringOption((option) =>
            option
              .setName(command_option.name)
              .setDescription(command_option.description)
              .setRequired(command_option.required)
              .setAutocomplete(command_option.autocomplete)
          );
        else console.log(command_option.type + " is not a valid option type.");
      });
    }

    console.log(slashCommand.toJSON().options![0]);

    client_commands.push(slashCommand);
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
