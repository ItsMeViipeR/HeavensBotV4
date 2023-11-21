import { Client, Collection } from "discord.js";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

export class HeavensBot extends Client {
  public commands: Collection<string, any> = new Collection();

  public constructor() {
    super({
      intents: 37379,
    });
  }

  public async start() {
    this.login(process.env.PROD_TOKEN);
  }
}
