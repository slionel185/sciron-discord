// Import types

// Import packages
import fs from 'fs'
import path from 'path'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
 
// Import local dependencies
import { env } from '@/utilities/env'
import interactionHandler from '@/handlers/interactionHandler'

// Client creation
const client = new Client({ intents: [ GatewayIntentBits.Guilds ]})

// Instantiate command collection
client.commands = new Collection()

// Set command paths and files
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'))

// Add commands to command collection
commandFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder)).filter(file => file.endsWith('.command.ts'))

    commandFiles.forEach(file => {
        const filePath = path.join(__dirname, 'commands', folder, file)
        const command = require(filePath)
    
        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required property.`)
        }
    })
})

// Client -> Ready
client.once(Events.ClientReady, c => {
    console.log(`Client ready! Logged in as ${c.user.tag}`)
})

// Client -> Create Interaction
client.on(Events.InteractionCreate, async (interaction) => {
    if(!interaction.isChatInputCommand()) return

    interactionHandler(interaction)
})

// Client -> Login
client.login(env.DISCORD_CLIENT_TOKEN)