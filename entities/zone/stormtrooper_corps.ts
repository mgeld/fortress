type TStormtrooperCorpsProps = {
    level: number
    // exp: number
    invaders: number
    power: number
}

export type UnmarshalledStormtrooperCorps = {
    level: number
    // exp: number
    invaders: number
    power: number
}

export class StormtrooperCorps {

    private _level: number
    // private _exp: number
    private _invaders: number
    private _power: number

    constructor(props: TStormtrooperCorpsProps) {
        this._level = props.level
        // this._exp = props.exp
        this._invaders = props.invaders
        this._power = props.power
    }

    public unmarshal(): UnmarshalledStormtrooperCorps {
        return {
            level: this._level,
            // exp: this._exp,
            invaders: this._invaders,
            power: this._power,
        }
    }

    arriveInvader(): number {
        this._invaders = this._invaders + 1
        return this._invaders
    }

    leaveInvader(): number {
        this._invaders = this._invaders - 1
        return this._invaders
    }

    storm(): number {
        this.leaveInvader()
        // this._invaders = this._invaders - 1
        return this._invaders
    }

    private static levels(): { [key: number]: number } {
        return {
            1: 50,
            2: 150,
            3: 255,
            4: 365,
        }
    }

    get level(): number {
        return this._level
    }

    get invaders(): number {
        return this._invaders
    }
}