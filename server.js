require('dotenv').config();
const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require('discord.js')


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const prefix = '!';

client.once("ready", () => {
    console.log("I'm alive and kicking")

    client.user.setActivity(`this is a test`, {type: "WATCHING"})
})


client.on("messageCreate", (message) => {
    if (!message.author.bot) {
        console.log(`[${message.author.tag}]: ${message.content}`)
    }
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).split(/ +/)
    const getCommand = args.shift().toLowerCase();

    const messageArray = message.content.split(" ")
    const argument = messageArray.slice(1);

    if (getCommand === 'beepbeep') {
        message.reply(`Beep beep, I'm a sheep. Beep Beep I'm a sheep`)
    }
    console.log(`[${message.author.tag}]: ${message.content}`)
})

client.login(process.env.DISCORD_BOT_TOKEN)