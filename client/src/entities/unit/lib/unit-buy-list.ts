// import { TExtrTypes } from "@ctypes/model";
// import { TUnitShop } from "../ui/unit/unit-card/ui";

type TCurrency = 'coins' | 'rubies'

export type TUnitBuy = {
    currency: TCurrency,
    price: number
}

export const unitsPrices: {[k: number]: TUnitBuy}  = {
    100: {
        currency: 'coins',
        price: 340
    },
    101: {
        currency: 'coins',
        price: 408
    },
    10: {
        currency: 'coins',
        price: 100
    },
    11: {
        currency: 'coins',
        price: 130
    },
    12: {
        currency: 'coins',
        price: 195
    },
    20: {
        currency: 'rubies',
        price: 15
    },
    21: {
        currency: 'rubies',
        price: 30
    },
    22: {
        currency: 'rubies',
        price: 45
    },
    30: {
        currency: 'coins',
        price: 150
    },
    31: {
        currency: 'coins',
        price: 200
    },
    32: {
        currency: 'coins',
        price: 250
    },
    40: {
        currency: 'rubies',
        price: 12
    },
    41: {
        currency: 'rubies',
        price: 24
    },
    42: {
        currency: 'rubies',
        price: 36
    },
    50: {
        currency: 'rubies',
        price: 10
    },
    51: {
        currency: 'rubies',
        price: 20
    },
    52: {
        currency: 'rubies',
        price: 30
    },
    // 110: {
    //     currency: 'coins',
    //     price: 100
    // },
    // 111: {
    //     currency: 'coins',
    //     price: 100
    // },
    // 120: {
    //     currency: 'coins',
    //     price: 100
    // },
    // 121: {
    //     currency: 'coins',
    //     price: 100
    // }
}