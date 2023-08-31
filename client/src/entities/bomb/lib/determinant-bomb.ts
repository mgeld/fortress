import { TBombSymbol } from "@ctypes/model"
import { Aerial, BombType } from "./aerial"

export const determinantBomb = (symbol: TBombSymbol, level: number): BombType => {
    if(symbol === 'aerial') {
        return Aerial.level(level)
    } else {
        throw new Error('----')
    }
}