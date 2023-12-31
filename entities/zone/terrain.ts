type TTerrainProps = {
    level: number
    sectors: number
    defenders: number
}

export type UnmarshalledTerrain = {
    level: number
    sectors: number
    defenders: number
}

export class Terrain {

    private _level: number

    private _sectors: number
    private _defenders: number

    constructor(props: TTerrainProps) {
        this._level = props.level
        this._sectors = props.sectors
        this._defenders = props.defenders
    }

    public unmarshal(): UnmarshalledTerrain {
        return {
            level: this._level,
            sectors: this._sectors,
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

    public addSector(): {
        level: number
        sectors: number
    } {
        this._sectors = this._sectors + 1

        if (this._sectors >= Terrain.levelAllSectors()[this._level]) {
            this._level += 1
        }

        return {
            level: this._level,
            sectors: this._sectors,
        }
    }

    public loseSector() {
        this._sectors = this._sectors - 1
    }

    private static levelSectors(): { [key: number]: number } {
        return {
            1: 50,
            2: 150,
            3: 300,
            4: 500,
            5: 750,
            6: 1050,
            7: 1400,
            8: 1800,
            9: 2250,
            10: 2750,
            11: 3300,
            12: 3900,
        }
    }

    private static levelAllSectors(): { [key: number]: number } {
        return {
            1: 50,
            2: 200,
            3: 500,
            4: 1000,
            5: 1750,
            6: 2800,
            7: 4200,
            8: 6000,
            9: 8250,
            10: 11000,
            11: 14300,
            12: 18200
        }
    }

    get level(): number {
        return this._level
    }

    get sectors(): number {
        return this._sectors
    }
}