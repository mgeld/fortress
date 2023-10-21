import { inject, injectable } from "inversify";
import { TExtrTypes, TZone } from "../common-types/model";
import { IZoneMemoryRepository, IZoneRepository } from "../entities/repository";
import { TYPES } from "../types";
import { randomNumber } from "../libs/random-number";
import { Zone } from "../entities/zone/zone";
import { ZoneMapper } from "../infra/database/mappers/zone";
import { EntityIdGenerator } from "../domain/entityId";

@injectable()
export class ZoneService {
    @inject(TYPES.ZoneMemoryRepository) private _memoryRepository!: IZoneMemoryRepository
    @inject(TYPES.ZoneRepository) private _baseRepository!: IZoneRepository
    @inject(TYPES.Base64EntityIdGenerator) private _entityId!: EntityIdGenerator

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
        // userId: number,
        color: number,
    ): Zone {

        const DEFAULT_COLOR = randomNumber(1, 6)

        const DEFAULT_RUBIES = 100
        const DEFAULT_COINS = 100

        const DEFAULT_TROPHIES = 100

        const DEFAULT_RANK = 1
        const DEFAULT_EXP = 0
        const DEFAULT_TEMP_EXP = 0

        const DEFAULT_LEVEL = 1
        const DEFAULT_SECTORS = 0

        const stormtrooper_corps = {
            level: 1,
            // exp: 0,
            invaders: 0,
            power: 0,
        }
        
        const guard_corps = {
            level: 1,
            exp: 0,
            defenders: 0
        }

        // const defenders = 0

        const extraction: TExtrTypes[] = []

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

        const zone = ZoneMapper.toDomain({
            // id: this._entityId.nextIdEntity().id,
            id: 0,
            color: DEFAULT_COLOR,
            rubies: DEFAULT_RUBIES,
            coins: DEFAULT_COINS,
            trophies: DEFAULT_TROPHIES,
            rank,
            terrain,
            stormtrooper_corps,
            // guard_corps,
            // defenders,
            extraction
        })

        return zone
    }



    // getByIds(userIds: number[]): Promise<Zone[]> {
    //     console.log('getByIds')
    //     return this._memoryRepository.getByIds(userIds)
    // }

    async memoryUpdate(zone: Zone) {
        await this._memoryRepository.update(zone)
    }

    remove(userId: number) {
        this._memoryRepository.delete(userId)
    }
}