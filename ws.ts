import 'reflect-metadata'

import { container } from './container'
import { TYPES } from './types'
import { IServer } from './api/socket/server'

const start = () => {
    const server = container.get<IServer>(TYPES.Server)

    return server.start()
}

start()