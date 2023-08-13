import { inject, injectable } from "inversify";
import { TZone } from "../common-types/model";
import { IZoneMemoryRepository, IZoneRepository } from "../entities/repository";
import { TYPES } from "../types";
import { randomNumber } from "../libs/random-number";
import { Zone } from "../entities/zone/zone";

@injectable()
export class ZoneService {
    @inject(TYPES.ZoneMemoryRepository) private _memoryRepository!: IZoneMemoryRepository
    @inject(TYPES.ZoneRepository) private _baseRepository!: IZoneRepository

    memoryInsert(zone: Zone): Promise<Zone> {
        return this._memoryRepository.insert(zone)
    }

    baseInsert(zone: Zone): Promise<Zone> {
        return this._baseRepository.insert(zone)
    }

    async getById(userId: number): Promise<Zone> {
        try {
            return this.memoryGetById(userId)
        } catch(e) {
            const zone = await this.baseGetById(userId)
            this.memoryInsert(zone)
            return zone
        }
    }

    memoryGetById(userId: number): Promise<Zone> {
        return this._memoryRepository.getById(userId)
    }

    baseGetById(userId: number): Promise<Zone> {
        return this._baseRepository.getById(userId)
    }

    create(
        userId: number,
        color: number,
    ): Zone {

        const DEFAULT_COLOR = randomNumber(1, 6)

        const DEFAULT_RUBIES = 100
        const DEFAULT_COINS = 100

        const DEFAULT_SECTORS = 0
        const DEFAULT_TROPHIES = 100

        const zone = Zone.create({
            id: userId,
            color: DEFAULT_COLOR,

            rubies: DEFAULT_RUBIES,
            coins: DEFAULT_COINS,

            sectors: DEFAULT_SECTORS,
            trophies: DEFAULT_TROPHIES,
        })

        return zone
    }

    getByIds(userIds: number[]): Promise<Zone[]> {
        console.log('getByIds')
        return this._memoryRepository.getByIds(userIds)
    }

    // getZoneByIds(_ids: number[]): Promise<TZone[]> {
    //     return this._baseRepository.getZoneByIds(_ids)
    // }

    async memoryUpdate(zone: Zone) {
        await this._memoryRepository.update(zone)
    }

    remove(userId: number) {
        this._memoryRepository.delete(userId)
    }
}