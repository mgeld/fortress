import { TExtrTypes, TExtrTypesName } from "../../common-types/model"
import { TExtrItem } from "../zone/extraction"

type TUnitPrice = {
    currency: 'coins' | 'rubies',
    price: number
}

type TExtrGroups = {
    [k: string]: {
        [k: number]: number
    }
}

type TExtrTypesTens = 10 | 20 | 30 | 40 | 50 | 100

export class Units {

    public static sale_units: Record<number, TUnitPrice> = {
        10: {
            currency: 'coins',
            price: 50
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
            price: 100
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
            price: 50
        },
        31: {
            currency: 'rubies',
            price: 50
        },
        32: {
            currency: 'rubies',
            price: 80
        },
        40: {
            currency: 'coins',
            price: 50
        },
        41: {
            currency: 'coins',
            price: 50
        },
        42: {
            currency: 'rubies',
            price: 70
        },
        50: {
            currency: 'coins',
            price: 50
        },
        51: {
            currency: 'coins',
            price: 50
        },
        52: {
            currency: 'coins',
            price: 100
        },
        100: {
            currency: 'coins',
            price: 50
        },
        101: {
            currency: 'coins',
            price: 100
        },
    }

    
    public static getTypeModuleNumber(number: TExtrTypes): TExtrTypesName {
        const types: { [k: number]: TExtrTypesName } = {
            10: 'rank_exp',
            20: 'storm_power',
            30: 'ship_health',
            40: 'gun_power',
            50: 'gun_distance',
            100: 'stormtroopers',
            110: 'rubies',
            120: 'coins',
        }
        const id: TExtrTypesTens = Math.floor(number / 10) * 10 as TExtrTypesTens
        return types[id]
    }

    private static __list: TExtrGroups = {
        rank_exp: {
            10: 100,
            11: 100,
            12: 100,
        },
        storm_power: {
            20: 100,
            21: 100,
            22: 100,
        },
        ship_health: {
            30: 100,
            31: 100,
            32: 100,
        },
        gun_power: {
            40: 100,
            41: 100,
            42: 100,
        },
        gun_distance: {
            50: 100,
            51: 100,
            52: 100,
        },
        stormtroopers: {
            100: 100,
            101: 100,
        },
        rubies: {
            110: 100,
            111: 100,
        },
        coins: {
            120: 100,
            121: 100,
        },
    }

    public static getUnitQuantity(id: TExtrTypes): TExtrItem {
        const gives = Units.getTypeModuleNumber(id)
        const quantity = Units.__list[gives][id]
        return {
            gives,
            quantity
        }
    }

    public static getUnitPrice(id: TExtrTypes): TUnitPrice {
        return Units.sale_units[id]
    }
    
}