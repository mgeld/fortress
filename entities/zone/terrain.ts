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
    // private _temporaryLastSector: string | null

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
        
        if (this._sectors >= Terrain.levels()[this._level]) {
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

    get sectors(): number {
        return this._sectors
    }
}