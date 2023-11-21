import { HeavensBot } from "../client";
import { CommandInteraction } from "discord.js";

const kick = {
  name: "kick",
  description: "Kick a member from the guild.",
  permissions: null,
  category: "Moderation",
  dm: false,
  options: [
    {
      name: "member",
      description: "The member to kick.",
      type: "user",
      required: true,
    },
    {
      name: "reason",
      description: "The reason of the kick.",
      type: "string",
      required: false,
    },
  ],
  async run(client: HeavensBot, interation: CommandInteraction) {
    // TODO: Add kick logic
  },
};

export default kick;
