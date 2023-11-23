// import { TExtrTypes } from "@ctypes/model";
// import { TUnitShop } from "../ui/unit/unit-card/ui";

type TCurrency = 'coins' | 'rubies'

export type TUnitBuy = {
    currency: TCurrency,
    price: number
}

export const unitsPrices: {[k: number]: TUnitBuy}  = {
    10: {
        currency: 'coins',
        price: 40
    },
    11: {
        currency: 'coins',
        price: 50
    },
    12: {
        currency: 'coins',
        price: 100
    },
    20: {
        currency: 'coins',
        price: 80
    },
    21: {
        currency: 'coins',
        price: 100
    },
    22: {
        currency: 'coins',
        price: 150
    },
    30: {
        currency: 'rubies',
        price: 10
    },
    31: {
        currency: 'rubies',
        price: 15
    },
    32: {
        currency: 'rubies',
        price: 30
    },
    40: {
        currency: 'coins',
        price: 40
    },
    41: {
        currency: 'coins',
        price: 50
    },
    42: {
        currency: 'rubies',
        price: 25
    },
    50: {
        currency: 'coins',
        price: 100
    },
    51: {
        currency: 'coins',
        price: 120
    },
    52: {
        currency: 'coins',
        price: 150
    },
    100: {
        currency: 'coins',
        price: 50
    },
    101: {
        currency: 'coins',
        price: 100
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