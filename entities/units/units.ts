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
        10: { // Нет в магазине
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
        20: { // Нет в магазине
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
        30: { // Нет в магазине
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
        40: { // Нет в магазине
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
        50: { // Нет в магазине
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
            10: 50,
            11: 100,
            12: 150,
        },
        storm_power: {
            20: 5,
            21: 10,
            22: 15,
        },
        ship_health: {
            30: 50,
            31: 100,
            32: 150,
        },
        gun_power: {
            40: 5,
            41: 10,
            42: 15,
        },
        gun_distance: {
            50: 15,
            51: 20,
            52: 25,
        },
        stormtroopers: {
            100: 50,
            101: 120,
        },
        rubies: {
            110: 50,
            111: 80,
        },
        coins: {
            120: 500,
            121: 900,
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