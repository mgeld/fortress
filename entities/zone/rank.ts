type TRankProps = {
    rank: number
    exp: number
    tempExp: number
    // temporaryLastSector: string | null
}

export type UnmarshalledRank = {
    rank: number
    exp: number
    tempExp: number
}

export class Rank {

    private _rank: number

    private _exp: number
    private _tempExp: number
    // private _temporaryLastSector: string | null

    constructor(props: TRankProps) {
        this._rank = props.rank
        this._exp = props.exp
        this._tempExp = props.tempExp
        // this._temporaryLastSector = props.temporaryLastSector
    }

    public unmarshal(): UnmarshalledRank {
        return {
            rank: this._rank,
            exp: this._exp,
            tempExp: this._tempExp,
        }
    }


    addExp(exp: number): [number, number] {
        const maxValueLevel = Rank.levelExp()[this._rank]

        const was_number = this._exp
        const summ = was_number + exp

        if (summ >= maxValueLevel) {
            this._rank += 1
            this._exp = 0
            return [was_number, this._exp]
        }

        this._exp = summ

        return [was_number, this._exp]
    }


    increaseExp(exp: number) {
        this._tempExp = this._tempExp + exp
    }

    saveExp(): [number, number] {
        const maxValueLevel = Rank.levelExp()[this._rank]

        const was_number = this._exp
        const summ = was_number + this._tempExp

        if (summ >= maxValueLevel) {
            this._rank += 1
            this._exp = 0
            return [was_number, this._exp]
        }
        this._exp = summ
        this._tempExp = 0

        return [was_number, this._exp]

        // this._temporaryLastSector = null
    }

    private static levelExp(): { [key: number]: number } {
        return {
            1: 350,
            2: 455,
            3: 665,
            4: 980,
            5: 1400,
            6: 1925,
            7: 2555,
            8: 3290,
            9: 4130,
            10: 5075,
            11: 6125,
            12: 7280,
            13: 8540,
            14: 9905,
            15: 11375,
            16: 12950,
            17: 14630,
            18: 16415,
            19: 18305,
            20: 20300,
            21: 22400,
            22: 24605,
            23: 26915,
            24: 29330
        }
    }

    get exp(): number {
        return this._exp
    }

    get rank(): number {
        return this._rank
    }

    get tempExp(): number {
        return this._tempExp
    }
}