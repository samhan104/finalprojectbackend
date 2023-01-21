const { SlashCommandBuilder } = require('discord.js')

module.exports ={
    data: new SlashCommandBuilder()
        .setName('beepbeep')
        .setDescription(`Replies with 'Beep Beep, I'm a Sheep. Beep Beep I'm a Sheep'`),
    async execute(interaction) {
        await interaction.reply(`Beep Beep, I'm a Sheep. Beep Beep I'm a Sheep`)
    }
}