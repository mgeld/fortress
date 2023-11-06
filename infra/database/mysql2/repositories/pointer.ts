import { injectable, inject } from 'inversify'
import { Pointer } from '../../../../entities/pointer/pointer'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { TYPES } from '../../../../types'
import { IPointerRepository } from '../../../../entities/repository'
import { PointerMapper } from '../../mappers/pointer'
import { TZone } from '../../../../common-types/model'

interface IPointerRowData {
    zone_id?: number

    icon?: string
    name?: string

    color?: number

    health?: number

    pos_lat?: number
    pos_lng?: number
    areal?: number
    weapons?: string
}

@injectable()
export class PointerRepository implements IPointerRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async getById(_id: number): Promise<Pointer> {
        const [[result]] = await this._connection.query<Required<IPointerRowData>[] & RowDataPacket[]>(
            `SELECT * FROM pointers WHERE id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        const {
            zone_id,

            icon,
            name,

            color,

            health,

            pos_lat,
            pos_lng,
            weapons,
            areal
        } = result

        return PointerMapper.toDomain({
            id: zone_id,

            user: {
                icon,
                name
            },

            color,

            health,

            pos: [pos_lat, pos_lng],
            weapons: weapons && JSON.parse(weapons) || '',
            bombs: [],
            areal: areal
        })
    }

    async getZoneByIds(_ids: number[]): Promise<TZone[]> {

        const [result] = await this._connection.query<TZone[] & RowDataPacket[]>(
            `SELECT
                zone_id,
                name,
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
            name: pointer.name,
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

                icon,
                name,

                color,

                health,
                // invaders,

                pos_lat,
                pos_lng,
                weapons,
                areal
            } = pointer

            return PointerMapper.toDomain({
                id: zone_id,

                user: {
                    icon,
                    name,
                },

                color,
                health,

                pos: [pos_lat, pos_lng],
                weapons: weapons && JSON.parse(weapons) || '',
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
                ?
            );
        `, [
            dtoPointer.id,

            dtoPointer.user.icon,
            dtoPointer.user.name,

            dtoPointer.color,

            dtoPointer.health,
            // dtoPointer.invaders,
            
            dtoPointer.pos[0],
            dtoPointer.pos[1],
            JSON.stringify(dtoPointer.weapons),
            dtoPointer.areal
        ])

        return pointer
    }

    async update(pointer: Pointer): Promise<Pointer> {
        const dtoPointer = pointer.unmarshal()
        // let arr: any[] = []
        // const arrQuerySet = entries(dtoPointer).map((item) => {
        //     if (!item) return ''

        //     if (item[0] === 'pos') {
        //         arr.push(item[1][0])
        //         arr.push(item[1][1])
        //         return [
        //             `'pos_lat' = ?`,
        //             `'pos_lng' = ?`
        //         ]

        //     }
        //     if (item[0] === 'weapons') {
        //         arr.push(JSON.stringify(item[1]))
        //         return `${item[0]} = '?'`
        //     }
        //     arr.push(item[1])
        //     return `${item[0]} = ?`
        // })

        const updated = await this._connection.execute(`
            UPDATE pointers SET
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
            dtoPointer.health,
            dtoPointer.user.icon,
            dtoPointer.user.name,
            dtoPointer.color,
            dtoPointer.pos[0],
            dtoPointer.pos[1],
            dtoPointer.weapons,
            JSON.stringify(dtoPointer.areal),
            
            pointer.zoneId
        ])

        return PointerMapper.toDomain(dtoPointer)
    }

    // async delete(userId: number): Promise<Boolean> {
    //     try {
    //         const updated = await this._connection.execute(`DELETE FROM pointers zoneId = ?`, [userId])
    //         return true
    //     } catch (e) {
    //         return false
    //     }
    // }

}
