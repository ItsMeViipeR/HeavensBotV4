import { HeavensBot } from "./client";
import { loadEvents } from "./loaders/loadEvents";

const client = new HeavensBot();

client.start();

loadEvents(client);
