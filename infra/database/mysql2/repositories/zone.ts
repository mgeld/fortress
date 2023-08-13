import { injectable, inject } from 'inversify'
import { Pointer, UnmarshalledPointer } from '../../../../entities/pointer/pointer'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { entries } from '../../../../libs/object-entries'
import { TYPES } from '../../../../types'
import { IZoneRepository } from '../../../../entities/repository'
import { TZone } from '../../../../common-types/model'
import { Zone } from '../../../../entities/zone/zone'
import { ZoneMapper } from '../../mappers/zone'

interface IZoneRowData {
    id?: number

    sectors?: number
    trophies?: number

    color?: number

    coins?: number
    rubies?: number
}

@injectable()
export class ZoneRepository implements IZoneRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async getById(_id: number): Promise<Zone> {
        const [[result]] = await this._connection.query<Required<IZoneRowData>[] & RowDataPacket[]>(
            `SELECT * FROM zones WHERE id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        const {
            id,

            sectors,
            trophies,

            color,

            coins,
            rubies
        } = result

        return ZoneMapper.toDomain({
            id,

            sectors,
            trophies,

            color,

            coins,
            rubies,
        })
    }

    // async getZoneByIds(_ids: number[]): Promise<TZone[]> {

    //     const [result] = await this._connection.query<TZone[] & RowDataPacket[]>(
    //         `SELECT
    //             id as zone_id,
    //             name,
    //             color
    //         FROM
    //             pointers
    //         WHERE
    //             id IN (?);`,
    //         [_ids]
    //     )

    //     console.log('getColorsByIds _ids.join(',')', _ids.join(','))
    //     console.log('getColorsByIds result', result)
    //     if (!result) {
    //         throw new Error('----------')
    //     }

    //     console.log('getColorsByIds result', result)

    //     return result.map(pointer => ({
    //         zone_id: pointer.zone_id,
    //         name: pointer.name,
    //         color: pointer.color
    //     }))

    // }

    async getByIds(_ids: number[]): Promise<Zone[]> {
        const [result] = await this._connection.query<Required<IZoneRowData>[] & RowDataPacket[]>(
            `SELECT * FROM zones WHERE id IN (?);`, [_ids]
        )
        if (!result) {
            throw new Error('----------')
        }

        return result.map(pointer => {
            const {
                id,

                sectors,
                trophies,

                color,

                coins,
                rubies,
            } = pointer

            return ZoneMapper.toDomain({
                id,

                sectors,
                trophies,

                color,

                coins,
                rubies,
            })
        })

    }

    async insert(zone: Zone): Promise<Zone> {
        const dtoZone = zone.unmarshal()

        const inserted = await this._connection.query(`
            INSERT INTO zones(
                id,

                sectors,
                trophies,

                color,

                coins,
                rubies
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
            dtoZone.id,

            dtoZone.sectors,
            dtoZone.trophies,

            dtoZone.color,

            dtoZone.coins,
            dtoZone.rubies
        ])

        return zone
    }

    async update(zone: Zone): Promise<Zone> {
        const dtoZone = zone.unmarshal()
        let arr: any[] = []
        const arrQuerySet = entries(dtoZone).map((item) => {
            if (!item) return ''

            arr.push(item[1])
            return `${item[0]} = ?`
        })

        const updated = await this._connection.execute(`
            UPDATE zones SET ${arrQuerySet.join(',')} WHERE id = ?
        `, [...arr, zone.id])

        return ZoneMapper.toDomain(dtoZone)
    }

    async delete(userId: number): Promise<Boolean> {
        try {
            const updated = await this._connection.execute(`DELETE FROM zones id = ?`, [userId])
            return true
        } catch (e) {
            return false
        }
    }

}
