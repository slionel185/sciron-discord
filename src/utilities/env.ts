import { z } from 'zod'
import { createEnv } from '@t3-oss/env-core'

export const env = createEnv({
    isServer: true,
    server: {
        NODE_ENV: z.enum(['development', 'production']),
        DISCORD_CLIENT_ID: z.string(),
        DISCORD_CLIENT_TOKEN: z.string().min(1),
        DATABSE_URL: z.string().min(1)
    },
    runtimeEnv: process.env
})