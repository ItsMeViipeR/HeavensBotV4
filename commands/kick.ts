import { HeavensBot } from "../client";
import { CommandInteraction, EmbedBuilder, User } from "discord.js";

type Nullable<T> = T | null;

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
    let user: User = interation.options.getUser("member")!;
    let reason: string = interation.options.get("reason")?.value?.toString()!;

    if (user.id === interation.user.id) {
      return interation.reply({
        content: "You cannot kick yourself!",
        ephemeral: true,
      });
    }

    if (user.id === client.user!.id) {
      return interation.reply({
        content: "You cannot kick me!",
        ephemeral: true,
      });
    }

    if (reason !== null && reason !== undefined) {
      await interation.guild!.members.kick(user, reason);
      try {
        user.send({
          content: `You have been kicked from ${
            interation.guild!.name
          } for ${reason}!`,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      await interation.guild!.members.kick(user);
      try {
        user.send({
          content: `You have been kicked from ${interation.guild!.name}!`,
        });
      } catch (e) {
        console.log(e);
      }
    }

    return interation.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("User kicked")
          .setDescription(
            `${user.tag} has been kicked from ${interation.guild!.name}`
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

export default kick;
