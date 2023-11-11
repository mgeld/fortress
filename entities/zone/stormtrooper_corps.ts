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
    private _invaders: number
    private _power: number

    constructor(props: TStormtrooperCorpsProps) {
        this._level = props.level
        this._invaders = props.invaders
        this._power = props.power
    }

    public unmarshal(): UnmarshalledStormtrooperCorps {
        return {
            level: this._level,
            invaders: this._invaders,
            power: this._power,
        }
    }

    increasePower(power: number): number {
        this._power = this._power + power
        return this._power
    }

    addInvaders(invaders: number): number {
        this._invaders = this._invaders + invaders
        return this._invaders
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
        return this._invaders
    }


    upLevel(): number {
        if (!StormtrooperCorps.validLevel(this._level + 1)) {
            throw new Error('')
        }
        this._level = this._level + 1
        return this._level
    }

    public static getLevelUpPrice(level: number): number {
        const levels: { [key: number]: number } = {
            1: 100,
            2: 100,
            3: 100,
            4: 100,
            5: 100,
            6: 100,
            7: 100,
            8: 100,
            9: 100,
            10: 100,
            11: 100,
            12: 100,
        }
        return levels[level]
    }


    public static validLevel(level: number) {
        return level > 0 && level <= 6
    }

    private static levelMaxPower(): { [key: number]: number } {
        return {
            1: 15,
            2: 25,
            3: 40,
            4: 60,
            5: 85,
            6: 115,
            7: 150,
            8: 190,
            9: 235,
            10: 285,
            11: 340,
            12: 400,
        }
    }

    private static levelMaxInvaders(): { [key: number]: number } {
        return {
            1: 50,
            2: 100,
            3: 155,
            4: 215,
            5: 280,
            6: 350,
            7: 425,
            8: 505,
            9: 590,
            10: 680,
            11: 775,
            12: 875

        }
    }

    get level(): number {
        return this._level
    }

    get invaders(): number {
        return this._invaders
    }
}