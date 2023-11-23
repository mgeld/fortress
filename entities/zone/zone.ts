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

    stormtrooper_corps: StormtrooperCorps

    hold: Extraction

    trophies: number

    coins: number
    rubies: number
}

export type UnmarshalledZone = {

    terrain: UnmarshalledTerrain
    rank: UnmarshalledRank

    stormtrooper_corps: UnmarshalledStormtrooperCorps

    hold: UnmarshalledExtraction

} & Omit<Required<TZoneProps>, 'rank' | 'terrain' | "guard_corps" | "stormtrooper_corps" | 'hold'>

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

    private _hold: Extraction

    private constructor(zone: TZoneProps) {
        this._id = zone.id || 0

        this._trophies = zone.trophies

        this._coins = zone.coins
        this._rubies = zone.rubies

        this._color = zone?.color || 1

        this._rank = zone.rank
        this._terrain = zone.terrain

        this._stormtrooper_corps = zone.stormtrooper_corps

        this._hold = zone.hold

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

            hold: this._hold.unmarshal()

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

    get coins() {
        return this._coins
    }

    get rubies() {
        return this._rubies
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

    get hold() {
        return this._hold
    }
    
    setTrophies(trophy: number) {
        let nTrophies = this._trophies + trophy
        if (nTrophies < 0) {
            nTrophies = 0
        }
        this._trophies = nTrophies
        return this._trophies
    }

    spendСoins(coins: number): number {
        const nCoins = this._coins - coins
        if (nCoins < 0) {
            return -1
        }
        this._coins = nCoins
        return this._coins
    }

    addCoins(coins: number): [number, number] {
        const was_number = this._coins
        const summ = was_number + coins
        this._coins = summ
        return [was_number, this._coins]
    }

    spendRubies(rubies: number): number {
        const nRubies = this._rubies - rubies
        if (nRubies < 0) {
            return -1
        }
        this._rubies = nRubies
        return this._rubies
    }

    addRubies(rubies: number): [number, number] {
        const was_number = this._rubies
        const summ = was_number + rubies
        this._rubies = summ
        return [was_number, this._rubies]
    }

}