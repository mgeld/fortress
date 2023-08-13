import { inject, injectable } from "inversify";
import { TLatLng, TZone } from "../common-types/model";
import { Pointer } from "../entities/pointer/pointer";
import { IPointerMemoryRepository, IPointerRepository } from "../entities/repository";
import { Weapon } from "../entities/weapon/weapon";
import { TYPES } from "../types";
import { randomNumber } from "../libs/random-number";

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
        userId: number,
        pos: TLatLng,
        name: string,
        weapon: Weapon
    ): Pointer {

        const DEFAULT_HEALTH = 100
        const DEFAULT_COLOR = randomNumber(1, 6)

        console.log('DEFAULT_COLOR', DEFAULT_COLOR)

        const DEFAULT_INVADERS = 100
        const DEFAULT_DEFENDERS = 100

        // const DEFAULT_RUBIES = 100
        // const DEFAULT_COINS = 100

        // const DEFAULT_SECTORS = 0
        // const DEFAULT_TROPHIES = 100

        const pointer = Pointer.create({
            id: userId,
            zoneId: 0,
            
            name: name,

            health: DEFAULT_HEALTH,
            color: DEFAULT_COLOR,

            // rubies: DEFAULT_RUBIES,
            // coins: DEFAULT_COINS,

            // sectors: DEFAULT_SECTORS,
            // trophies: DEFAULT_TROPHIES,

            invaders: DEFAULT_INVADERS,
            defenders: DEFAULT_DEFENDERS,

            weapons: [weapon.id],

            pos: pos
        })

        return pointer
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