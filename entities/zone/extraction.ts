import { TExtrTypes, TExtrTypesName, TLatLng, TTypeToastNotice } from "../../common-types/model"
import { randomNumber } from "../../libs/random-number"

type TExtractionProps = {
    list: TExtrTypes[]
}

export type UnmarshalledExtraction = TExtrTypes[]

type TExtrItem = {
    gives: TExtrTypesName
    quantity: number
}

type TExtrTypesTens = 10 | 20 | 30 | 40 | 50

type TExtrGroups = {
    [k: string]: {
        [k: number]: number
    }
}

export class Extraction {

    private _list: TExtrTypes[]

    constructor(props: TExtractionProps) {
        this._list = props.list
    }

    public unmarshal(): UnmarshalledExtraction {
        return this._list
    }

    // public static probabilityGettingExtractionInFort(pos: TLatLng): boolean {
    //     const probabilityNumber = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)))

    //     console.log('pos', pos)
    //     console.log('probabilityNumber', probabilityNumber)

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


    use(id: TExtrTypes, index: number): TExtrItem {
        this._list.splice(index, 1)
        return Extraction.getExtraction(id)
    }

    addExtrToList(probabilityNumber: TExtrTypes) {
        this._list.push(probabilityNumber)
    }

    public static getContainerExtr(cont_id: 1 | 2 | 3): TExtrTypes {
        const __containers = {
            // Контейнер: [список добыч]
            1: [10, 20, 30, 40, 50],
            2: [11, 21, 31, 41, 51],
            3: [12, 22, 32, 42, 52],
        }
        const cont: number[] = __containers[cont_id]
        return cont[randomNumber(0, cont.length - 1)] as TExtrTypes
    }

    public static getTypeModuleNumber(number: TExtrTypes): TExtrTypesName {
        const types: { [k: number]: TExtrTypesName } = {
            10: 'rank_exp',
            20: 'storm_power',
            30: 'ship_health',
            40: 'gun_power',
            50: 'gun_distance',
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
    }

    private static getExtraction(id: TExtrTypes): TExtrItem {
        const gives = Extraction.getTypeModuleNumber(id)
        const quantity = Extraction.__list[gives][id]
        return {
            gives,
            quantity
        }
    }

}