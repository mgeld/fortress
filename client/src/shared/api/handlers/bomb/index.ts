import { bombsAPI } from "shared/api/events";
import { Handler } from "..";
import { TBomb } from '@ctypes/socket/server-to-client'
import { determinantBomb } from "entities/bomb/lib/determinant-bomb";

class BombHandler extends Handler {

    handle(message: TBomb) {

        const BOMB_ID: number = Date.now()

        const pos = message.payload.position
        const userId = message.payload.userId

        // Куда попало поставляется с бэка. Бэк получает эти данные от клиента, который выстрелил
        const bombSymbolLevel = message.payload.bomb

        const bomb = determinantBomb(bombSymbolLevel.symbol, bombSymbolLevel.level)

        bombsAPI.events.addBomb({
            id: BOMB_ID,
            pos,
            radius: bomb.radius
        })

        setTimeout(() => {

            bombsAPI.events.delBombById({ bomb_id: BOMB_ID })

            bombsAPI.events.hitBombInTarget({
                hitUserId: userId,
                damage: bomb.damage
            })

        }, 500)
    }
}

BombHandler.EVENT = 'bomb'

export {
    BombHandler
}