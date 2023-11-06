import { TExtrTypes } from "../../common-types/model"

type TUnitPrice = {
    currency: 'coins' | 'rubies',
    price: number
}

export class Units {

    public static units: Record<number, TUnitPrice> = {
        50: {
            currency: 'coins',
            price: 100
        },
        20: {
            currency: 'coins',
            price: 90
        },
        31: {
            currency: 'coins',
            price: 80
        },
        41: {
            currency: 'coins',
            price: 100
        },
    }

    public static getUnit(id: TExtrTypes): TUnitPrice {
        return Units.units[id]
    }
    
}