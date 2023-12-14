import { TYPES } from "../types";
import { inject, injectable } from "inversify";
import { User } from "../entities/pointer/user";
import { randomNumber } from "../libs/random-number";
import { Pointer } from "../entities/pointer/pointer";
import { WeaponType } from "../entities/weapon/types";
import { TLatLng, TZone, TZoneColor } from "../common-types/model";
import { IPointerMemoryRepository, IPointerRepository } from "../entities/repository";

@injectable()
export class PointerService {
    @inject(TYPES.PointerMemoryRepository) private _memoryRepository!: IPointerMemoryRepository
    @inject(TYPES.PointerRepository) private _baseRepository!: IPointerRepository

    memoryInsert(pointer: Pointer): Promise<Pointer> {
        return this._memoryRepository.insert(pointer)
    }

    baseInsert(pointer: Pointer): Promise<Pointer> {
        return this._baseRepository.insert(pointer)
    }

    async getById(userId: number): Promise<Pointer> {
        try {
            console.log('PointerService TRY')
            return await this.memoryGetById(userId)
        } catch (e) {
            console.log('PointerService CATCH')
            return this.baseGetById(userId)
        }
    }

    async memoryGetById(userId: number): Promise<Pointer> {
        try {
            const pointer = await this._memoryRepository.getById(userId)
            return pointer
        } catch (e) {
            throw new Error('PointerService memoryGetById catch throw')
        }
    }

    async baseGetById(userId: number): Promise<Pointer> {
        console.log('baseGetById userId', userId)
        return await this._baseRepository.getById(userId)
    }

    create(
        zoneId: number,
        pos: TLatLng,
        name: string,
        icon: string,
        weapon: WeaponType
    ): Pointer {

        const DEFAULT_HEALTH = 100
        const DEFAULT_COLOR = randomNumber(1, 6) as TZoneColor

        const DEFAULT_INVADERS = 100
        const DEFAULT_DEFENDERS = 100

        const pointer = Pointer.create({
            zoneId,
            level: 1,

            user: User.create({
                icon,
                name,
            }),

            health: DEFAULT_HEALTH,
            color: DEFAULT_COLOR,

            weapons: [weapon.id],

            pos
        })

        return pointer
    }

    getByIds(userIds: number[]): Promise<Pointer[]> {
        return this._memoryRepository.getByIds(userIds)
    }

    async getMarshalPointers(userIds: number[]) {
        const pointers = await this.getByIds(userIds)

        const users: Record<number, {
            lvl: number
            icon: string
            name: string
            health: number
            color: TZoneColor
        }> = {}

        pointers.forEach(pointer => {
            users[pointer.zoneId] = {
                lvl: pointer.level,
                icon: pointer.user.icon,
                name: pointer.user.name,
                health: pointer.health,
                color: pointer.color
            }
        })

        return users
    }

    getZoneByIds(_ids: number[]): Promise<TZone[]> {
        return this._baseRepository.getZoneByIds(_ids)
    }

    async memoryUpdate(pointer: Pointer) {
        await this._memoryRepository.update(pointer)
    }

    async baseUpdate(pointer: Pointer) {
        await this._baseRepository.update(pointer)
    }

    remove(userId: number) {
        this._memoryRepository.delete(userId)
    }
}