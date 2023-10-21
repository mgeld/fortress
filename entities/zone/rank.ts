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

    increaseExperience(exp: number) {
        this._tempExp = this._tempExp + exp
    }

    addExperience(): {
        rank: number
        amount: number
    } {
        this._exp = this._tempExp

        this._tempExp = 0

        if (this._exp >= Rank.ranks()[this._rank]) {
            this._rank += 1
        }

        return {
            rank: this._rank,
            amount: this._exp,
        }

        // this._temporaryLastSector = null
    }

    private static ranks(): { [key: number]: number } {
        return {
            1: 500,
            2: 1000,
            3: 1600,
            4: 2300,
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