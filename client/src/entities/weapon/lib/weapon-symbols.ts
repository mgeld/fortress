import { TWeaponSymbol } from "@ctypes/model"

type TSymbolForNumber = {
    [symbol: string]: number
}
type TNumberForSymbol = {
    [number: number]: TWeaponSymbol
}

// export const symbolToNumber = (symbol: TWeaponSymbol): number => {
//     const symbols: TSymbolForNumber = {
//         'gun': 1
//     }
//     return symbols[symbol]
// }

// export const numberToSymbol = (number: number): TWeaponSymbol => {
//     const numbers: TNumberForSymbol = {
//         1: 'gun'
//     }
//     return numbers[number]
// }