import { TBombSymbol } from "@ctypes/model"

type TSymbolForNumber = {
    [symbol: string]: number
}
type TNumberForSymbol = {
    [number: number]: TBombSymbol
}

export const symbolToNumber = (symbol: TBombSymbol): number => {
    const symbols: TSymbolForNumber = {
        'aerial': 1
    }
    return symbols[symbol]
}

export const numberToSymbol = (number: number): TBombSymbol => {
    const numbers: TNumberForSymbol = {
        1: 'aerial'
    }
    return numbers[number]
}