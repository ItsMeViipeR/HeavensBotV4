import { HeavensBot } from "../client";
import { CommandInteraction, EmbedBuilder, User } from "discord.js";

const ban = {
  name: "ban",
  description: "Ban a member from the guild.",
  permissions: null,
  category: "Moderation",
  dm: false,
  options: [
    {
      name: "member",
      description: "The member to ban.",
      type: "user",
      required: true,
    },
    {
      name: "reason",
      description: "The reason of the ban.",
      type: "string",
      required: false,
    },
  ],
  async run(client: HeavensBot, interation: CommandInteraction) {
    let user: User = interation.options.getUser("member")!;
    let reason: string = interation.options.get("reason")?.value?.toString()!;

    if (user.id === interation.user.id) {
      return interation.reply({
        content: "You cannot ban yourself!",
        ephemeral: true,
      });
    }

    if (user.id === client.user!.id) {
      return interation.reply({
        content: "You cannot ban me!",
        ephemeral: true,
      });
    }

    if (reason !== null && reason !== undefined) {
      await interation.guild!.members.ban(user, { reason });
      try {
        user.send({
          content: `You have been banned from ${
            interation.guild!.name
          } for ${reason}!`,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      await interation.guild!.members.ban(user);
      try {
        user.send({
          content: `You have been banned from ${interation.guild!.name}!`,
        });
      } catch (e) {
        console.log(e);
      }
    }

    return interation.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("User banned")
          .setDescription(
            `${user.tag} has been banned from ${interation.guild!.name}`
          )
          .setColor("Red")
          .setImage(user.displayAvatarURL())
          .addFields([
            {
              name: "Member",
              value: user.tag,
            },
            {
              name: "Reason",
              value: reason ?? "No reason provided.",
            },
          ])
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
      ephemeral: false,
    });
  },
};

export default ban;
