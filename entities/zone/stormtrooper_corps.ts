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

    increasePower(power: number): number | 'limit' {
        if (StormtrooperCorps.getLevelMaxPower(this._level) > this._power) {
            this._power = this._power + power
            return this._power
        }
        return 'limit'
    }

    addInvaders(invaders: number): number | 'limit' {
        if (StormtrooperCorps.getLevelMaxInvaders(this._level) > this._invaders) {
            this._invaders = this._invaders + invaders
            return this._invaders
        }
        return 'limit'
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
            1: 0,
            2: 100,
            3: 300,
            4: 600,
            5: 1000,
            6: 1500,
            7: 2100,
            8: 2800,
            9: 3600,
            10: 4500,
            11: 5500,
            12: 6600
        }
        return levels[level]
    }


    public static validLevel(level: number) {
        return level > 0 && level <= 6
    }

    private static getLevelMaxPower(level: number): number {
        const levels: { [key: number]: number } = {
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
        return levels[level]
    }

    private static getLevelMaxInvaders(level: number): number {
        const levels: { [key: number]: number } = {
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
        return levels[level]
    }

    get level(): number {
        return this._level
    }

    get invaders(): number {
        return this._invaders
    }
}