import fs from 'fs'
import path from 'path'
import { REST, Routes } from 'discord.js'

import { env } from '@/utilities/env'

const commands: any[] = []

const foldersPath = path.join(__dirname, '..', 'commands')
const commandFolders = fs.readdirSync(foldersPath)

commandFolders.forEach(folder => {
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.command.ts'))

    commandFiles.forEach(file => {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)

        if('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON())
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required property.`)
        }
    })
})

const rest = new REST().setToken(env.DISCORD_CLIENT_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)

        const data: any = await rest.put(
            Routes.applicationCommands(env.DISCORD_CLIENT_ID),
            { body: commands }
        )

        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch(error: any) {
        console.log(`[ERROR] Message: ${error.message}`)
    }
})()