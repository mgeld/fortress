
// Пока что удалено. Логика перенесена в Terrain

type TGuardCorpsProps = {
    // level: number
    // exp: number
    defenders: number
}

export type UnmarshalledGuardCorps = {
    // level: number
    // exp: number
    defenders: number
}

export class GuardCorps {

    // private _level: number
    // private _exp: number
    private _defenders: number

    constructor(props: TGuardCorpsProps) {
        // this._level = props.level
        // this._exp = props.exp
        this._defenders = props.defenders
    }

    public unmarshal(): UnmarshalledGuardCorps {
        return {
            // level: this._level,
            // exp: this._exp,
            defenders: this._defenders
        }
    }

    newDefender(): number {
        this._defenders = this._defenders + 1
        return this._defenders
    }

    killDefender(): number {
        this._defenders = this._defenders - 1
        return this._defenders
    }

    private static levels(): { [key: number]: number } {
        return {
            1: 50,
            2: 150,
            3: 255,
            4: 365,
        }
    }

    // get level(): number {
    //     return this._level
    // }

    get defenders(): number {
        return this._defenders
    }
}