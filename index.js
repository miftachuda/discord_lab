require("dotenv").config();
const { Client, GatewayIntentBits, Events } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});
client.login(process.env.CLIENT_TOKEN);
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.channels.client.on(Events.MessageCreate, (msg) => {
  if (msg.content == "lab") {
    msg.reply(`Accessing Labware and getting data,\nPlease wait ... !!`);
  }
});
