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

    private _extraction: Extraction

    private constructor(zone: TZoneProps) {
        this._id = zone.id || 0

        this._trophies = zone.trophies

        this._coins = zone.coins
        this._rubies = zone.rubies

        this._color = zone?.color || 1

        this._rank = zone.rank
        this._terrain = zone.terrain

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

            color: this.color,

            trophies: this._trophies,

            coins: this._coins,
            rubies: this._rubies,

            terrain: this._terrain.unmarshal(),
            rank: this._rank.unmarshal(),

            stormtrooper_corps: this._stormtrooper_corps.unmarshal(),

            extraction: this._extraction.unmarshal()

        }
    }

    get id(): number {
        return this._id
    }

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

    get extraction() {
        return this._extraction
    }

    spendСoins(coins: number): number {
        this._coins = this._coins - coins
        return this._coins
    }

}