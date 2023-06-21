import type { CommandInteraction } from 'discord.js'

import { SlashCommandBuilder } from 'discord.js'

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!')
    }
}