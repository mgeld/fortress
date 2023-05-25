import { Arena, TRegistr } from "./arena/arena"
import { Pointer } from "./pointer/pointer"
import { Weapon } from "./weapon/weapon"

export interface IPointerRepository {
    // findAll(arenaId: number): Promise<Pointer[]>
    getById(userId: number): Promise<Pointer>
    getByIds(userIds: number[]): Promise<Pointer[]>
    insert(pointer: Pointer): Promise<Pointer>
    update(pointer: Pointer): Promise<Pointer>
    delete(userId: number): Promise<Boolean>
}

export interface IArenaRepository {
    insert(arena: Arena): Promise<Arena>
    count(): Promise<number>
    getById(arenaId: string): Promise<Arena>
    getForRegistrArena(registr: TRegistr): Promise<Arena> 
    update(arena: Arena): Promise<Arena>
    delete(arenaId: string): Promise<Boolean>
}

export interface IWeaponRepository {
    getWeapons(ids: string[]): Promise<Weapon[]>
    getById(id: string): Promise<Weapon>
    insert(weapon: Weapon): Promise<Weapon>
    update(weapon: Weapon): Promise<Weapon>
    delete(userId: string): Promise<Boolean>
}