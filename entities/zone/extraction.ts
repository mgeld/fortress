import { TExtrTypes, TExtrTypesName, TLatLng, TTypeToastNotice } from "../../common-types/model"
import { randomNumber } from "../../libs/random-number"
import { Units } from "../units/units"

type TExtractionProps = {
    level: THoldLevel
    items: TExtrTypes[]
}

export type UnmarshalledExtraction = {
    level: THoldLevel
    items: TExtrTypes[]
}

export type TExtrItem = {
    gives: TExtrTypesName
    quantity: number
}

export type THoldLevel = 1 | 2 | 3 | 4 | 5 | 6

// type TExtrTypesTens = 10 | 20 | 30 | 40 | 50

export class Extraction {

    private _items: TExtrTypes[]

    private _level: THoldLevel

    constructor(props: TExtractionProps) {
        this._level = props.level
        this._items = props.items
    }

    public unmarshal(): UnmarshalledExtraction {
        return {
            level: this._level,
            items: this._items,
        }
    }


    public static getLevelUpPrice(level: number): number {
        const levels: { [key: number]: number } = {
            1: 0,
            2: 504,
            3: 2052,
            4: 4626,
            5: 8226,
            6: 12852
        }
        return levels[level]
    }

    upLevel(limit: number): number | 'limit' {
        if (!Extraction.validLevel(this._level + 1, limit)) {
            return 'limit'
        }
        this._level = this._level + 1 as THoldLevel
        return this._level
    }

    public static validLevel(level: number, limit: number) {
        return level > 0 && level <= limit
    }


    private static getLevelMaxItems(level: number): number {
        const levels: { [key: number]: number } = {
            1: 10,
            2: 15,
            3: 20,
            4: 25,
            5: 30,
            6: 35
        }
        return levels[level]
    }


    use(id: TExtrTypes, index: number): TExtrItem | null {
        const items = this._items.slice()
        if (items[index] === id) {
            items.splice(index, 1)
            this._items = items
            return Units.getUnitQuantity(id)
        }
        // if (~items.findIndex(item => item === id)) {
        //     items.splice(index, 1)
        //     this._items = items
        //     return Units.getUnitQuantity(id)
        // }
        return null
    }

    // addExtrToList(probabilityNumber: TExtrTypes) {
    //     this._items.push(probabilityNumber)
    // }

    addExtrToList(probabilityNumber: TExtrTypes): TExtrTypes | 'limit' {
        const maxValueLevel = Extraction.getLevelMaxItems(this._level)
        if (this._items.length + 1 <= maxValueLevel) {
            this._items.unshift(probabilityNumber)
            return probabilityNumber
        }
        return 'limit'
    }


    // public static probabilityGettingExtractionInFort(pos: TLatLng): boolean {
    //     const probabilityNumber = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)))

    //     return probabilityNumber < 5

    // }

    // getExtractionInFort() {

    //     if (probabilityNumber in Extraction.__extr) {
    //         const type = Extraction.getExtraction(+probabilityNumber as TExtrTypes)
    //         // this._list.push(+probabilityNumber as TExtrTypes)
    //         return type
    //     }
    //     return null
    // }

    // public static getContainerExtr(cont_id: 1 | 2 | 3): TExtrTypes {
    //     const __containers = {
    //         // Контейнер: [список добыч]
    //         1: [10, 20, 30, 40, 50],
    //         2: [11, 21, 31, 41, 51],
    //         3: [12, 22, 32, 42, 52],
    //     }
    //     const cont: number[] = __containers[cont_id]
    //     return cont[randomNumber(0, cont.length - 1)] as TExtrTypes
    // }

    // public static getTypeModuleNumber(number: TExtrTypes): TExtrTypesName {
    //     const types: { [k: number]: TExtrTypesName } = {
    //         10: 'rank_exp',
    //         20: 'storm_power',
    //         30: 'ship_health',
    //         40: 'gun_power',
    //         50: 'gun_distance',
    //     }
    //     const id: TExtrTypesTens = Math.floor(number / 10) * 10 as TExtrTypesTens
    //     return types[id]
    // }

    // private static __list: TExtrGroups = {
    //     rank_exp: {
    //         10: 100,
    //         11: 100,
    //         12: 100,
    //     },
    //     storm_power: {
    //         20: 100,
    //         21: 100,
    //         22: 100,
    //     },
    //     ship_health: {
    //         30: 100,
    //         31: 100,
    //         32: 100,
    //     },
    //     gun_power: {
    //         40: 100,
    //         41: 100,
    //         42: 100,
    //     },
    //     gun_distance: {
    //         50: 100,
    //         51: 100,
    //         52: 100,
    //     },
    // }

    // private static getExtraction(id: TExtrTypes): TExtrItem {
    //     const gives = Extraction.getTypeModuleNumber(id)
    //     const quantity = Units.__list[gives][id]
    //     return {
    //         gives,
    //         quantity
    //     }
    // }

}