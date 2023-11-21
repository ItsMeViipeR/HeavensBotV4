import { HeavensBot } from "../client";

export default function ready(client: HeavensBot) {
  console.log(`Logged in as ${client.user?.id}!`);
}
