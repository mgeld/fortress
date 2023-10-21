import { Extraction, UnmarshalledExtraction } from "./extraction"
import { GuardCorps, UnmarshalledGuardCorps } from "./guard_corps"
import { Rank, UnmarshalledRank } from "./rank"
import { StormtrooperCorps, UnmarshalledStormtrooperCorps } from "./stormtrooper_corps"
import { Terrain, UnmarshalledTerrain } from "./terrain"

export type TZoneProps = {
    id: number

    color: number

    rank: Rank
    terrain: Terrain

    // guard_corps: GuardCorps
    // defenders: number
    stormtrooper_corps: StormtrooperCorps

    extraction: Extraction

    trophies: number
    coins: number
    rubies: number
}

export type UnmarshalledZone = {

    // level: number
    // exp: number
    // tempExp: number
    
    terrain: UnmarshalledTerrain
    rank: UnmarshalledRank

    stormtrooper_corps: UnmarshalledStormtrooperCorps
    // guard_corps: UnmarshalledGuardCorps

    extraction: UnmarshalledExtraction

} & Omit<Required<TZoneProps>, 'rank' | 'terrain' | "guard_corps" | "stormtrooper_corps" | 'extraction'>

// class User считай. Просто исторически сложилось, что название Zone
// Да и поменять лень
export class Zone {

    // private _id: string
    private _id: number

    private _trophies: number

    private _coins: number
    private _rubies: number

    private _color: number

    private _terrain: Terrain

    private _rank: Rank

    private _stormtrooper_corps: StormtrooperCorps
    // private _guard_corps: GuardCorps
    
    // private _defenders: number

    private _extraction: Extraction

    private constructor(zone: TZoneProps) {
        this._id = zone.id || 0
        // this._zoneId = zone?.zoneId || 0

        // this._sectors = zone.sectors

        this._trophies = zone.trophies

        this._coins = zone.coins
        this._rubies = zone.rubies

        this._color = zone?.color || 1

        this._rank = zone.rank
        this._terrain = zone.terrain

        // this._guard_corps = zone.guard_corps
        // this._defenders = zone.defenders
        this._stormtrooper_corps = zone.stormtrooper_corps
        
        this._extraction = zone.extraction

    }

    public static create(zone: TZoneProps) {
        const instance = new Zone(zone)
        return instance
    }

    public unmarshal(): UnmarshalledZone {
        return {
            id: this._id,
            // zoneId: this._zoneId,

            color: this.color,

            trophies: this._trophies,

            coins: this._coins,
            rubies: this._rubies,

            // // Terrain
            // level: this._terrain.level,
            // sectors: this._terrain.sectors,
            // exp: this._rank.exp,
            // tempExp: this._rank.tempExp,

            terrain: this._terrain.unmarshal(),
            rank: this._rank.unmarshal(),

            stormtrooper_corps: this._stormtrooper_corps.unmarshal(),
            // guard_corps: this._guard_corps.unmarshal(),
            // defenders: this._defenders,

            extraction: this._extraction.unmarshal()

        }
    }

    get id(): number {
        return this._id
    }

    // get zoneId(): number {
    //     return this._zoneId
    // }

    set id(id: number) {
        this._id = id
    }

    get color() {
        return this._color
    }

    get rank() {
        return this._rank
    }

    get terrain() {
        return this._terrain
    }

    get stormtrooper_corps() {
        return this._stormtrooper_corps
    }

    // get guard_corps() {
    //     return this._guard_corps
    // }

    get extraction() {
        return this._extraction
    }

    // get sectors() {
    //     return this._sectors
    // }

}