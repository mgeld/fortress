import { injectable, inject } from 'inversify'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { TLatLng } from '../../../../common-types/model'
import { ISectorRepository } from '../../../../entities/repository'
import { Sector, UnmarshalledSector } from '../../../../entities/sector/sector'
import { entries } from '../../../../libs/object-entries'
import { TYPES } from '../../../../types'
import { SectorMapper } from '../../mappers/sector'

interface ISectorRowData {
    id?: number
    sector?: number
    invaders?: number
    defenders?: number
    lat?: number
    lng?: number
    user_id?: number
    areal?: string
}

@injectable()
export class SectorRepository implements ISectorRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async insert(sector: Sector): Promise<Sector> {
        const dtoSector = sector.unmarshal()

        const inserted = await this._connection.query(`
        INSERT INTO pointers(
            id,
            invaders,
            defenders,
            lat,
            lng,
            zone_id,
            areal
        )VALUES(
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            0
        );
    `, [
            dtoSector.id,
            dtoSector.invaders,
            dtoSector.defenders,
            dtoSector.latlng[0],
            dtoSector.latlng[1],
            dtoSector.zone_id,
            // dtoSector.areal
        ])

        return sector
    }

    async inserts(sectors: Sector[]): Promise<Boolean> {

        if (sectors.length === 0) {
            return false
        }

        const sqlSectors = sectors.map(sector => {
            const dtoSector = sector.unmarshal()
            return [
                dtoSector.id,
                dtoSector.invaders,
                dtoSector.defenders,
                dtoSector.latlng[0],
                dtoSector.latlng[1],
                dtoSector.zone_id,
                dtoSector.areal
            ]
        })

        console.log('sqlSectors', sqlSectors)

        try {

            const inserted = await this._connection.query(`
                INSERT INTO sectors(
                    id,
                    invaders,
                    defenders,
                    lat,
                    lng,
                    zone_id,
                    areal
                )VALUES ?
                ON DUPLICATE KEY UPDATE
                    invaders=VALUES(invaders),
                    defenders=VALUES(defenders),
                    zone_id=VALUES(zone_id);
            `, [sqlSectors])

            return true

        } catch (e) {

            throw new Error('Много записей добавить не удалось. Сорян')

        }

    }


    async getBoundsSectors(bounds: [TLatLng, TLatLng]): Promise<UnmarshalledSector[]> {

        console.log('/// Base getBoundsSectors')
        const where = `lat > ? and lat < ? and lng > ? and lng < ?`;
        try {
            const [result] = await this._connection.query<UnmarshalledSector[] & RowDataPacket[]>(
                `SELECT
                    id,
                    number,
                    CONCAT("[",lat,",",lng,"]") as latlng,
                    zone_id,
                    invaders,
                    defenders,
                    areal
                FROM sectors WHERE ${where};`,
                [
                    bounds[0][0],
                    bounds[1][0],
                    bounds[0][1],
                    bounds[1][1]
                ]
            )

            const sects = result.map(sector => ({ ...sector, latlng: JSON.parse((sector.latlng as unknown) as string) }))
            // console.log('result sects', sects)

            return sects

        } catch (e) {

            console.log('eeeeeee', e)
            throw new Error('Не удалось вывести территории из базы')
        }
        // if (!result) {
        //     throw new Error('Не удалось вывести сектора из базы')
        // }

        // return result
    }



    async getByAreal(areal: number): Promise<UnmarshalledSector[]> {

        console.log('///>>>>>> Base getByAreal')

        try {
            const [result] = await this._connection.query<UnmarshalledSector[] & RowDataPacket[]>(
                `SELECT
                    id,
                    number,
                    CONCAT("[",lat,",",lng,"]") as latlng,
                    zone_id,
                    invaders,
                    defenders,
                    areal
                FROM sectors WHERE areal = ?;`,
                [areal]
            )

            const sects = result.map(sector => ({ ...sector, latlng: JSON.parse((sector.latlng as unknown) as string) }))
            console.log('result sects', sects)

            return sects

        } catch (e) {

            throw new Error('Не удалось вывести территории из базы')
        }
    }

    async getById(sectorId: string): Promise<Sector> {

        const [result] = await this._connection.query<UnmarshalledSector & RowDataPacket[]>(
            `SELECT
                id,
                number,
                CONCAT("[",lat,",",lng,"]") as latlng,
                zone_id,
                invaders,
                defenders,
                areal
            FROM sectors WHERE id = ?;`,
            [sectorId]
        )
        // const sector = await this._database.sector.getById<UnmarshalledSector>(sectorId)
        if (!result) {
            throw new Error('----------')
        }
        return SectorMapper.toDomain(result)
    }

    async getByIds(sectorIds: string[]): Promise<Sector[]> {
        const [result] = await this._connection.query<UnmarshalledSector[] & RowDataPacket[]>(
            `SELECT
                id,
                number,
                CONCAT("[",lat,",",lng,"]") as latlng,
                zone_id,
                invaders,
                defenders,
                areal
            FROM
                sectors
            WHERE id IN(?);`,
            [[sectorIds]]
        )
        // const sector = await this._database.sector.getById<UnmarshalledSector>(sectorId)
        if (!result) {
            throw new Error('----------')
        }
        return result.map(sector => SectorMapper.toDomain(sector))
    }

    async update(sector: Sector): Promise<Sector> {
        const dtoSector = sector.unmarshal()

        let arr: any[] = []
        const arrQuerySet = entries(dtoSector).map((item) => {
            if (!item) return ''
            if (item[0] === 'number') return ''

            if (item[0] === 'latlng') {
                arr.push(item[1][0])
                arr.push(item[1][1])
                return [
                    `'lat' = ?`,
                    `'lng' = ?`
                ]
            }
            arr.push(item[1])
            return `${item[0]} = ?`
        })

        const updated = await this._connection.execute(`
            UPDATE sectors SET ${arrQuerySet.join(',')} WHERE id = ?
        `, [...arr, dtoSector.id])

        return sector
    }

    async delete(sectorId: string): Promise<Boolean> {
        try {
            const updated = await this._connection.execute(`DELETE FROM sectors id = ?`, [sectorId])
            return true
        } catch (e) {
            return false
        }
    }
}
