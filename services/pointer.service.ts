import { inject, injectable } from "inversify";
import { TLatLng, TZone } from "../common-types/model";
import { Pointer } from "../entities/pointer/pointer";
import { IPointerMemoryRepository, IPointerRepository } from "../entities/repository";
import { TYPES } from "../types";
import { randomNumber } from "../libs/random-number";
import { User } from "../entities/pointer/user";
import { WeaponType } from "../entities/weapon/types";

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

    memoryGetById(userId: number): Promise<Pointer> {
        return this._memoryRepository.getById(userId)
    }

    baseGetById(userId: number): Promise<Pointer> {
        return this._baseRepository.getById(userId)
    }

    create(
        zoneId: number,
        pos: TLatLng,
        name: string,
        icon: string,
        weapon: WeaponType
    ): Pointer {

        const DEFAULT_HEALTH = 100
        const DEFAULT_COLOR = randomNumber(1, 6)

        console.log('DEFAULT_COLOR', DEFAULT_COLOR)

        const DEFAULT_INVADERS = 100
        const DEFAULT_DEFENDERS = 100

        const pointer = Pointer.create({
            zoneId,

            user: User.create({
                icon,
                name,
            }),

            health: DEFAULT_HEALTH,
            color: DEFAULT_COLOR,

            weapons: [weapon.id],

            pos: pos
        })

        return pointer
    }

    increaseExperience() {

    }

    getByIds(userIds: number[]): Promise<Pointer[]> {
        console.log('getByIds')
        return this._memoryRepository.getByIds(userIds)
    }

    getZoneByIds(_ids: number[]): Promise<TZone[]> {
        return this._baseRepository.getZoneByIds(_ids)
    }

    async memoryUpdate(pointer: Pointer) {
        await this._memoryRepository.update(pointer)
    }

    remove(userId: number) {
        this._memoryRepository.delete(userId)
    }
}