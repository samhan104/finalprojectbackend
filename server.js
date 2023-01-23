require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js')
const fetch = require('node-fetch')


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once("ready", () => {
    console.log("I'm alive and kicking")

    client.user.setActivity(`this is a test`, { type: "WATCHING" })
})


client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith("!quiz")) return;
    if (message.content.toLowerCase().startsWith("!quiz")) {
        const response = await fetch("https://shielded-everglades-02667.herokuapp.com/discord");
        const data = await response.json();
        const length = data.length;
        const questions = data[Math.floor(Math.random()*length)]


        const filter = response => {
            return questions.answer.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        }


        message.channel.send({ content: questions.question, fetchReply: true })
            .then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        message.channel.send(`${collected.first().author} got the correct answer!`);
                    })
                    .catch(collected => {
                        message.channel.send('Looks like nobody got the answer this time.');
                    });
            });
    }
})


client.login(process.env.DISCORD_BOT_TOKEN)