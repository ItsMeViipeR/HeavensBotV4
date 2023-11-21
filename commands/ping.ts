import { HeavensBot } from "../client";
import { CommandInteraction } from "discord.js";

const ping = {
  name: "ping",
  description: "Give bot's ping",
  permissions: null,
  category: "Informations",
  dm: false,
  options: [
    {
      name: "test",
      description: "Heyhey",
      type: "string",
      required: false,
      autocomplete: true,
    },
  ],
  async run(client: HeavensBot, interation: CommandInteraction) {
    console.log("ping");
    client.commands.forEach((element) => {
      console.log(element.options);
    });
    await interation.reply(`🏓 Pong! \`${client.ws.ping}ms\``);
  },
};

export default ping;
