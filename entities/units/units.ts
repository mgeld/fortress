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
        120: {
            currency: 'rubies',
            price: 13
        },
        121: {
            currency: 'rubies',
            price: 17
        }
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
            10: 80,
            11: 100,
            12: 150,
        },
        storm_power: {
            20: 3,
            21: 6,
            22: 10,
        },
        ship_health: {
            30: 50,
            31: 100,
            32: 150,
        },
        gun_power: {
            40: 3,
            41: 6,
            42: 9,
        },
        gun_distance: {
            50: 15,
            51: 20,
            52: 25,
        },
        stormtroopers: {
            100: 100,
            101: 150,
        },
        rubies: {
            110: 10,
            111: 20,
        },
        coins: {
            120: 260,
            121: 340,
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