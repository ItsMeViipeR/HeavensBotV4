import { HeavensBot } from "../client";
import { CommandInteraction } from "discord.js";

const ping = {
  name: "ping",
  description: "Give bot's ping",
  permissions: null,
  category: "Informations",
  dm: false,
  async run(client: HeavensBot, interation: CommandInteraction) {
    console.log("ping");
    await interation.reply(`🏓 Pong! \`${client.ws.ping}ms\``);
  },
};

export default ping;
