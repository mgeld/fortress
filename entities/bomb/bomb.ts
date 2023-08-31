import { TBombSymbol } from "../../common-types/model"

export interface BombType {
    name: string
    symbol: TBombSymbol
    level: number
    upLevel(): number
    damage: number
    radius: number
}

type TBombStatus = 'used' | 'stock'

export type UnmarshalledBomb = {
    id: string
    bomb: number
    counter: number
    level: number
    status: 1 | 0
}

export type TBombProps = {
    id: string,
    bomb: BombType,
    counter: number
    status?: 1 | 0
}

type TSymbolForNumber = {
    [symbol: string]: number
}
type TNumberForSymbol = {
    [number: number]: TBombSymbol
}

export class Bomb {

    private _id: string
    public bomb: BombType
    private _counter: number
    private _status: TBombStatus

    private constructor(props: TBombProps) {
        this.bomb = props.bomb
        this._id = props.id
        this._counter = props.counter
        this._status = props?.status ? 'used' : 'stock'
    }

    public static create(props: TBombProps) {
        return new Bomb(props)
    }

    public unmarshal(): UnmarshalledBomb {
        return {
            id: this._id,
            bomb: this.symbolToNumber(this.bomb.symbol),
            level: this.bomb.level,
            counter: this.counter,
            status: this.status === 'used' ? 1 : 0
        }
    }

    symbolToNumber(symbol: TBombSymbol): number {
        const symbols: TSymbolForNumber = {
            'aerial': 1
        }
        return symbols[symbol]
    }

    numberToSymbol(number: number): TBombSymbol {
        const numbers: TNumberForSymbol = {
            1: 'aerial'
        }
        return numbers[number]
    }

    get id() {
        return this._id
    }

    set counter(count: number) {
        this._counter = count
    }

    get counter() {
        return this._counter
    }

    set status(status: TBombStatus) {
        this._status = status
    }

    get status() {
        return this._status
    }

}
