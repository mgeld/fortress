import { TLatLng, TZone } from "../common-types/model"
import { Areal } from "./areal/areal"
import { Arena, TRegistr } from "./arena/arena"
import { Team } from "./arena/arena-team"
import { Member } from "./arena/arena-team-member"
import { ArenaSector, UnmarshalledArenaSector } from "./arena/sector"
import { Bomb } from "./bomb/bomb"
import { Citadel } from "./citadel/citadel"
import { Pointer } from "./pointer/pointer"
import { Sector, UnmarshalledSector } from "./sector/sector"
import { WeaponType } from "./weapon/types"
import { Zone } from "./zone/zone"

export interface IPointerMemoryRepository {
    getById(userId: number): Promise<Pointer>
    getByIds(userIds: number[]): Promise<Pointer[]>
    insert(pointer: Pointer): Promise<Pointer>
    update(pointer: Pointer): Promise<Pointer>
    delete(userId: number): Promise<Boolean>
}
export interface IZoneMemoryRepository {
    getById(userId: number): Promise<Zone>
    getByIds(userIds: number[]): Promise<Zone[]>
    insert(zone: Zone): Promise<Zone>
    update(zone: Zone): Promise<Zone>
    delete(userId: number): Promise<Boolean>
}

export interface IPointerRepository {
    getById(userId: number): Promise<Pointer>
    getZoneByIds(_ids: number[]): Promise<TZone[]>
    insert(pointer: Pointer): Promise<Pointer>
    update(pointer: Pointer): Promise<Pointer>
    // delete(userId: number): Promise<Boolean>
}
export interface IZoneRepository {
    getById(userId: number): Promise<Zone>
    // getZoneByIds(_ids: number[]): Promise<TZone[]>
    insert(zone: Zone): Promise<Zone>
    update(zone: Zone): Promise<Zone>
    // delete(userId: number): Promise<Boolean>
}


export interface IArenaRepository {
    insert(arena: Arena): Promise<Arena>
    count(): Promise<number>
    getById(arenaId: string): Promise<Arena>
    getForRegistrArena(registr: TRegistr): Promise<Arena>
    update(arena: Arena): Promise<Arena>
    delete(arenaId: string): Promise<Boolean>
}

export interface IArenaTeamRepository {
    insert(team: Team): Promise<Team>
    // count(): Promise<number>
    getById(teamId: string): Promise<Team>
    getByIds(teamIds: string[]): Promise<Team[]>
    update(team: Team): Promise<Team>
    delete(teamId: string): Promise<Boolean>
    deleteByArenas(arenas: string[]): Promise<Boolean>
}

export interface IArenaTeamMemberRepository {
    insert(member: Member): Promise<Member>
    getById(userId: number): Promise<Member>
    getByIds(userIds: number[]): Promise<Member[]>
    update(member: Member): Promise<Member>
    delete(userId: number): Promise<Boolean>
}

export interface IWeaponMemoryRepository {
    getWeapons(ids: string[]): Promise<WeaponType[]>
    getById(id: string): Promise<WeaponType>
    insert(weapon: WeaponType): Promise<WeaponType>
    update(weapon: WeaponType): Promise<WeaponType>
    delete(userId: string): Promise<Boolean>
}
export interface IWeaponRepository {
    getWeapons(ids: string[]): Promise<WeaponType[]>
    getById(id: string): Promise<WeaponType>
    insert(weapon: WeaponType): Promise<WeaponType>
    update(weapon: WeaponType): Promise<WeaponType>
}


export interface IBombMemoryRepository {
    getBombs(ids: string[]): Promise<Bomb[]>
    getById(id: string): Promise<Bomb>
    insert(bomb: Bomb): Promise<Bomb>
    update(bomb: Bomb): Promise<Bomb>
    delete(userId: string): Promise<Boolean>
}
export interface IBombRepository {
    getBombs(ids: string[]): Promise<Bomb[]>
    getById(id: string): Promise<Bomb>
    insert(bomb: Bomb): Promise<Bomb>
    update(bomb: Bomb): Promise<Bomb>
}

export interface ISectorMemoryRepository {
    insert(sector: Sector): Promise<Sector>
    inserts(sectors: UnmarshalledSector[]): Promise<Boolean>
    getById(sectorId: string): Promise<Sector>
    getByIds(sectorIds: string[]): Promise<Sector[]>
    getBoundsSectors(bounds: [TLatLng, TLatLng]): Promise<UnmarshalledSector[]>
    update(sector: Sector): Promise<Sector>
    delete(sectorId: string): Promise<Boolean>
    deleteByAreals(areals: number[]): Promise<Boolean>
}

export interface IArenaSectorMemoryRepository {
    insert(sector: ArenaSector): Promise<ArenaSector>
    // inserts(sectors: UnmarshalledArenaSector[]): Promise<Boolean>
    getById(sectorId: string, arenaId: string): Promise<ArenaSector>
    // getByIds(sectorIds: string[]): Promise<ArenaSector[]>
    update(sector: ArenaSector): Promise<ArenaSector>
    delete(sectorId: string): Promise<Boolean>
    deleteByArenas(arenas: string[]): Promise<Boolean>
}

export interface ISectorRepository {
    insert(sector: Sector): Promise<Sector>
    inserts(sectors: Sector[]): Promise<Boolean>
    getById(sectorId: string): Promise<Sector>
    getById(sectorId: string): Promise<Sector>
    getByIds(sectorIds: string[]): Promise<Sector[]>
    getBoundsSectors(bounds: [TLatLng, TLatLng]): Promise<UnmarshalledSector[]>
    update(sector: Sector): Promise<Sector>
    delete(sectorId: string): Promise<Boolean>
}

export interface IArealMemoryRepository {
    insert(areal: Areal): Promise<Areal>
    getById(arealId: number): Promise<Areal>
}

export interface ICitadelMemoryRepository {
    insert(citadel: Citadel): Promise<Citadel>
    getById(userId: number): Promise<Citadel>
    update(citadel: Citadel): Promise<Citadel>
    delete(userId: number): Promise<Boolean>
}

export interface ICitadelRepository {
    insert(citadel: Citadel): Promise<Citadel>
    getById(userId: number): Promise<Citadel>
    update(citadel: Citadel): Promise<Citadel>
    delete(userId: number): Promise<Boolean>
}