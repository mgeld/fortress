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

    increasePower(power: number): [number, number] | 'limit' {
        const maxValueLevel = StormtrooperCorps.getLevelMaxPower(this._level)
        if (maxValueLevel > this._power) {
            const was_number = this._power
            const summ = was_number + power
            this._power = summ > maxValueLevel ? maxValueLevel : summ
            return [was_number, this._power]
        }
        return 'limit'
    }

    addInvaders(invaders: number): [number, number] | 'limit' {
        const maxValueLevel = StormtrooperCorps.getLevelMaxInvaders(this._level)
        if (maxValueLevel > this._invaders) {
            const was_number = this._invaders
            const summ = was_number + invaders
            this._invaders = summ > maxValueLevel ? maxValueLevel : summ
            return [was_number, this._invaders]
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


    upLevel(limit: number): number | 'limit' {
        if (!StormtrooperCorps.validLevel(this._level + 1, limit)) {
            return 'limit'
        }
        this._level = this._level + 1
        return this._level
    }

    public static validLevel(level: number, limit: number) {
        return level > 0 && level <= limit
    }


    public static getLevelUpPrice(level: number): number {
        const levels: { [key: number]: number } = {
            1: 0,
            2: 400,
            3: 806,
            4: 1209,
            5: 3283,
            6: 4924,
            7: 7401,
            8: 11102,
            9: 13161,
            10: 19742,
            11: 20563,
            12: 30844
        }
        return levels[level]
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
            1: 150,
            2: 210,
            3: 285,
            4: 375,
            5: 480,
            6: 600,
            7: 735,
            8: 885,
            9: 1050,
            10: 1230,
            11: 1425,
            12: 1625
        }
        return levels[level]
    }

    get level(): number {
        return this._level
    }

    get invaders(): number {
        return this._invaders
    }

    get power(): number {
        return this._power
    }
}