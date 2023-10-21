import { inject, injectable } from "inversify";
import { TLatLng, TZoneItem } from "../common-types/model";
import { Areal } from "../entities/pointer/areal";
import { ISectorMemoryRepository, ISectorRepository } from "../entities/repository";
import { Sector, TSectorProps, UnmarshalledSector } from "../entities/sector/sector";
import { TYPES } from "../types";

type TCreateSectorProps = Omit<TSectorProps, 'areal'>

@injectable()
export class SectorService {
    @inject(TYPES.SectorRepository) private _baseRepository!: ISectorRepository
    @inject(TYPES.SectorMemoryRepository) private _memoryRepository!: ISectorMemoryRepository

    create({
        id,
        latlng,
        zone_id,
    }: TCreateSectorProps): Sector {
        return Sector.create({
            id,
            latlng,
            zone_id,
            areal: Areal.generator(latlng)
        })
    }

    async getBoundsSectors(position: TLatLng): Promise<UnmarshalledSector[]> {
        const bounds = Areal.getBounds(position)
        try {
            return await this._memoryRepository.getBoundsSectors(bounds)
        } catch (e) {
            const sectors = await this._baseRepository.getBoundsSectors(bounds)
            await this._memoryRepository.inserts(sectors)
            return sectors
        }
    }

    async getZonesAroundPosition(position: TLatLng): Promise<Record<number, TZoneItem>> {
        const _sectors = await this.getBoundsSectors(position)
        const sectors: Record<number, TZoneItem> = _sectors.reduce((zoneItems, item) => {
            if (!zoneItems[item.zone_id]) {
                zoneItems[item.zone_id] = {} as TZoneItem
                zoneItems[item.zone_id]['zone'] = {
                    zone_id: item.zone_id,
                    name: '',
                    color: 1
                }
                zoneItems[item.zone_id]['sectors'] = []
            }
            zoneItems[item.zone_id]['sectors'].push(item.id)
            return zoneItems

        }, {} as Record<number, TZoneItem>)

        return sectors
    }


    memoryInsert(sector: Sector): Promise<Sector> {
        return this._memoryRepository.insert(sector)
    }

    baseInsert(sector: Sector): Promise<Sector> {
        return this._baseRepository.insert(sector)
    }

    baseInserts(sectors: Sector[]): Promise<Boolean> {
        console.log('baseInserts')
        return this._baseRepository.inserts(sectors)
    }

    getById(sectorId: string): Promise<Sector> {
        return this._memoryRepository.getById(sectorId)
    }

    getByIds(sectorIds: string[]): Promise<Sector[]> {
        console.log('getByIds sectorIds', sectorIds)
        return this._memoryRepository.getByIds(sectorIds)
    }

    async update(sector: Sector) {
        await this._memoryRepository.update(sector)
    }

    remove(sectorId: string) {
        this._memoryRepository.delete(sectorId)
    }

    removeByAreals(areals: number[]) {
        this._memoryRepository.deleteByAreals(areals)
    }
}