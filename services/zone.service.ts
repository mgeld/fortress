import { TYPES } from "../types";
import { Zone } from "../entities/zone/zone";
import { inject, injectable } from "inversify";
import { randomNumber } from "../libs/random-number";
import { THoldLevel } from "../entities/zone/extraction";
import { ZoneMapper } from "../infra/database/mappers/zone";
import { IRatingZone, TExtrTypes, TZoneColor } from "../common-types/model";
import { IZoneMemoryRepository, IZoneRepository } from "../entities/repository";

@injectable()
export class ZoneService {
    @inject(TYPES.ZoneRepository) private _baseRepository!: IZoneRepository
    @inject(TYPES.ZoneMemoryRepository) private _memoryRepository!: IZoneMemoryRepository

    memoryInsert(zone: Zone): Promise<Zone> {
        return this._memoryRepository.insert(zone)
    }

    baseInsert(zone: Zone): Promise<Zone> {
        return this._baseRepository.insert(zone)
    }

    async getById(userId: number): Promise<Zone> {
        try {
            const zone = await this.memoryGetById(userId)
            return zone
        } catch (e) {
            const zone = await this.baseGetById(userId)
            this.memoryInsert(zone)
            return zone
        }
    }

    async memoryGetById(userId: number): Promise<Zone> {
        try {
            const zone = await this._memoryRepository.getById(userId)
            return zone
        } catch (e) {
            throw new Error('ZoneService memoryGetById catch throw')
        }
    }

    async memoryGetByIds(userIds: number[]): Promise<Zone[]> {
        const zones = await this._memoryRepository.getByIds(userIds)
        return zones
    }

    async baseGetById(userId: number): Promise<Zone> {
        const zone = await this._baseRepository.getById(userId)
        return zone
    }

    async getTrophies(): Promise<IRatingZone[]> {
        const zones = await this._baseRepository.getTrophies()
        return zones
    }

    async getZone(id: number): Promise<IRatingZone> {
        const zone = await this._baseRepository.getZone(id)
        return zone
    }

    create(
        color: number,
    ): Zone {

        const DEFAULT_COLOR = randomNumber(1, 6) as TZoneColor

        const DEFAULT_RUBIES = 150
        const DEFAULT_COINS = 2000

        const DEFAULT_TROPHIES = 0

        const DEFAULT_RANK = 1
        const DEFAULT_EXP = 0
        const DEFAULT_TEMP_EXP = 0

        const DEFAULT_LEVEL = 1
        const DEFAULT_SECTORS = 0

        const stormtrooper_corps = {
            level: 1,
            invaders: 50,
            power: 5
        }

        const rank = {
            rank: 1,
            exp: 0,
            tempExp: 0
        }

        const terrain = {
            level: 1,
            sectors: 0,
            defenders: 0
        }

        const hold: {
            level: THoldLevel
            items: TExtrTypes[]
        } = {
            level: 1,
            items: []
        }

        const zone = ZoneMapper.toDomain({
            id: 0,
            color: DEFAULT_COLOR,
            description: '',
            rubies: DEFAULT_RUBIES,
            coins: DEFAULT_COINS,
            trophies: DEFAULT_TROPHIES,
            rank,
            terrain,
            stormtrooper_corps,
            hold
        })

        return zone
    }

    async memoryUpdate(zone: Zone) {
        await this._memoryRepository.update(zone)
    }

    async memoryUpdates(zones: Zone[]) {
        zones.forEach(async zone => {
            await this._memoryRepository.update(zone)
        })
    }

    async baseUpdate(zone: Zone) {
        await this._baseRepository.update(zone)
    }

    remove(userId: number) {
        this._memoryRepository.delete(userId)
    }
}