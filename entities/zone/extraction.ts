import { TExtrTypes, TLatLng, TTypeToastNotice } from "../../common-types/model"
import { randomNumber } from "../../libs/random-number"

type TExtractionProps = {
    list: TExtrTypes[]
}

export type UnmarshalledExtraction = TExtrTypes[]

type TExtrItem = {
    id: TExtrTypes
    class: string
    gives: TTypeToastNotice
    quantity: number
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
            1: [1,2],
            2: [3],
            3: [4],
        }
        const cont: number[] = __containers[cont_id]
        return cont[randomNumber(0, cont.length - 1)] as TExtrTypes
    }

    private static __extr: { [key: number]: TExtrItem } = {
        1: {
            id: 1,
            class: 'resource',
            gives: 'coins',
            quantity: 1000
        },
        2: {
            id: 2,
            class: 'resource',
            gives: 'coins',
            quantity: 1500
        },
        3: {
            id: 3,
            class: 'resource',
            gives: 'rubies',
            quantity: 20
        },
        4: {
            id: 4,
            class: 'module',
            gives: 'exp-rank',
            quantity: 150
        }
    }

    private static getExtraction(id: TExtrTypes): TExtrItem {
        return Extraction.__extr[id]
    }

}