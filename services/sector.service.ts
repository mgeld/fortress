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
            console.log('getBoundsSectors try')
            return await this._memoryRepository.getBoundsSectors(bounds)
        } catch (e) {
            const sectors = await this._baseRepository.getBoundsSectors(bounds)
            console.log('getBoundsSectors catch')
            await this._memoryRepository.inserts(sectors)
            return sectors
        }
    }

    async getArealSectors(areal: number): Promise<UnmarshalledSector[]> {
        // const bounds = Areal.getBounds(position)
        try {
            return await this._memoryRepository.getByAreal(areal)
        } catch (e) {
            const sectors = await this._baseRepository.getByAreal(areal)
            await this._memoryRepository.inserts(sectors)
            return sectors.filter(sector => sector.zone_id > 0)
        }
    }

    async getZonesAroundPosition(position: TLatLng): Promise<Record<number, TZoneItem>> {
        const _sectors = await this.getBoundsSectors(position)
        return this.unmarshalSectors(_sectors)
    }
    async getZonesAroundAreal(areal: number): Promise<Record<number, TZoneItem>> {
        const _sectors = await this.getArealSectors(areal)
        return this.unmarshalSectors(_sectors)

    }

    async getBoundsCitadel(position: TLatLng): Promise<UnmarshalledSector[]> {
        const bounds = Areal.getBoundsCitadel(position)
        const sectors = await this._baseRepository.getBoundsSectors(bounds)
        return sectors
    }

    // async getZonesAroundCitadel(position: TLatLng): Promise<Record<number, TZoneItem>> {
    //     const _sectors = await this.getBoundsCitadel(position)
    //     return this.unmarshalSectors(_sectors)
    // }

    unmarshalSectors(_sectors: TSectorProps[]) {
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
        return this._baseRepository.inserts(sectors)
    }

    async getById(sectorId: string): Promise<Sector> {
        try {
            return await this._memoryRepository.getById(sectorId)
        } catch (e) {
            return this._baseRepository.getById(sectorId)
        }
    }

    getByIds(sectorIds: string[]): Promise<Sector[]> {
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