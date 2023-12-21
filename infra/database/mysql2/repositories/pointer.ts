import { injectable, inject } from 'inversify'
import { Pointer } from '../../../../entities/pointer/pointer'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { TYPES } from '../../../../types'
import { IPointerRepository } from '../../../../entities/repository'
import { PointerMapper } from '../../mappers/pointer'
import { TZone, TZoneColor } from '../../../../common-types/model'

interface IPointerRowData {
    zone_id?: number
    level: number

    icon?: string
    name?: string

    color?: TZoneColor

    health?: number

    pos_lat?: number
    pos_lng?: number

    areal?: number
    weapons?: string[]
}

@injectable()
export class PointerRepository implements IPointerRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async getById(_id: number): Promise<Pointer> {

        const [[result]] = await this._connection.query<Required<IPointerRowData>[] & RowDataPacket[]>(
            `SELECT * FROM pointers WHERE zone_id = ?;`, [_id]
        )

        const {
            zone_id,

            level,
            health,

            icon,
            name,

            color,

            pos_lat,
            pos_lng,

            weapons,
            areal
        } = result

        return PointerMapper.toDomain({
            id: zone_id,
            level,

            user: {
                icon,
                name
            },

            color,
            health,

            pos: [+pos_lat, +pos_lng],
            weapons,
            bombs: [],
            areal
        })

    }

    async getZoneByIds(_ids: number[]): Promise<TZone[]> {

        const [result] = await this._connection.query<TZone[] & RowDataPacket[]>(
            `SELECT
                zone_id,
                color
            FROM
                pointers
            WHERE
                zone_id IN (?);`,
            [_ids]
        )

        if (!result) {
            throw new Error('----------')
        }

        return result.map(pointer => ({
            zone_id: pointer.zone_id,
            color: pointer.color
        }))

    }

    async getByIds(_ids: number[]): Promise<Pointer[]> {
        const [result] = await this._connection.query<Required<IPointerRowData>[] & RowDataPacket[]>(
            `SELECT * FROM pointers WHERE zone_id IN (?);`, [_ids]
        )
        if (!result) {
            throw new Error('----------')
        }

        return result.map(pointer => {
            const {
                zone_id,

                level,

                icon,
                name,

                color,

                health,

                pos_lat,
                pos_lng,
                weapons,
                areal
            } = pointer

            return PointerMapper.toDomain({
                id: zone_id,

                level,

                user: {
                    icon,
                    name,
                },

                color,
                health,

                pos: [pos_lat, pos_lng],
                weapons,
                bombs: [],
                areal: areal
            })
        })

    }

    async insert(pointer: Pointer): Promise<Pointer> {
        const dtoPointer = pointer.unmarshal()

        const inserted = await this._connection.query(`
            INSERT INTO pointers(
                zone_id,
                level,
                icon,
                name,
                color,
                health,
                pos_lat,
                pos_lng,
                weapons,
                areal
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
            dtoPointer.id,
            dtoPointer.level,

            dtoPointer.user.icon,
            dtoPointer.user.name,

            dtoPointer.color,

            dtoPointer.health,

            dtoPointer.pos[0],
            dtoPointer.pos[1],
            JSON.stringify(dtoPointer.weapons),
            dtoPointer.areal
        ])

        return pointer
    }

    async update(pointer: Pointer): Promise<Pointer> {
        const dtoPointer = pointer.unmarshal()

        const updated = await this._connection.execute(`
            UPDATE
                pointers
            SET
                level = ?,
                health = ?,
                icon = ?,
                name = ?,
                color = ?,
                pos_lat = ?,
                pos_lng = ?,
                weapons = ?,
                areal = ?
            WHERE zone_id = ?
        `, [
            dtoPointer.level,
            dtoPointer.health,
            dtoPointer.user.icon,
            dtoPointer.user.name,
            dtoPointer.color,
            dtoPointer.pos[0],
            dtoPointer.pos[1],
            JSON.stringify(dtoPointer.weapons),
            dtoPointer.areal,

            pointer.zoneId
        ])

        return pointer
    }

}
