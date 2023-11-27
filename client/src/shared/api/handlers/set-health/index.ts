import { pointersAPI } from "shared/api/events";
import { Handler } from "..";
import { TSetHealth } from '@ctypes/socket/server-to-client'

class SetHealthHandler extends Handler {

    handle(message: TSetHealth) {

        console.log('SetHealthHandler handle')

        // Куда попало поставляется с бэка. Бэк получает эти данные от клиента, который выстрелил
        const userId = message.payload.userId
        const health = message.payload.health

        pointersAPI.events.setHealthPointer({
            health: health,
            userId: userId
        })

    }
}

SetHealthHandler.EVENT = 'set-health'

export {
    SetHealthHandler
}