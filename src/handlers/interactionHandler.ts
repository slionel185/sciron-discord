import type { ChatInputCommandInteraction } from 'discord.js'

export default async function interactionHandler(interaction: ChatInputCommandInteraction) {
    const command = interaction.client.commands.get(interaction.commandName)

    if(!command) {
        console.log(`[ERROR] No command matching ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch(error: any) {
        console.log(`[ERROR] Error message: ${error.message}`)
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
        } else {
            
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
}