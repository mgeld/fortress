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
        return level > 0 && level <= 12
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
            1: 100,
            2: 150,
            3: 205,
            4: 265,
            5: 330,
            6: 400,
            7: 475,
            8: 555,
            9: 640,
            10: 730,
            11: 825,
            12: 925
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