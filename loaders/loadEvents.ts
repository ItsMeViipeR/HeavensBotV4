import { readdirSync } from "fs";
import { HeavensBot } from "../client";

export function loadEvents(client: HeavensBot) {
  readdirSync("./events")
    .filter((f) => f.endsWith(".ts"))
    .forEach(async (file) => {
      let event = (await import(`../events/${file}`)).default;

      client.on(file.split(".ts").join(""), event.bind(null, client));

      console.log(`Event ${file.split(".ts").join("")} loaded!`);
    });
}
