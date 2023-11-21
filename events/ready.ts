import { ActivityType } from "discord.js";
import { HeavensBot } from "../client";
import loadSlashCommands from "../loaders/loadSlashCommands";

export default async function ready(client: HeavensBot) {
  await loadSlashCommands(client);

  let servers = client.guilds.cache.size;
  let users = client.users.cache.size;
  let activities = [
    `${servers} serveurs`,
    `${client.commands.size} commandes`,
    `${users} utilisateurs`,
  ];
  let activity = activities[Math.floor(Math.random() * activities.length)];

  client.user!.setActivity({
    name: activity,
    type: ActivityType.Watching,
  });

  setInterval(async () => {
    client.user!.setActivity({
      name: activity,
      type: ActivityType.Watching,
    });

    await loadSlashCommands(client);
  }, 60 * 1000);
}
