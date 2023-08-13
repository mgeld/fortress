import { injectable, inject } from 'inversify'
import { Pointer } from '../../../../entities/pointer/pointer'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { entries } from '../../../../libs/object-entries'
import { TYPES } from '../../../../types'
import { IPointerRepository } from '../../../../entities/repository'
import { PointerMapper } from '../../mappers/pointer'
import { TZone } from '../../../../common-types/model'

interface IPointerRowData {
    id?: number
    zoneId?: number

    icon?: string
    name?: string

    // sectors?: number
    // trophies?: number

    color?: number

    // coins?: number
    // rubies?: number

    health?: number

    invaders?: number
    defenders?: number

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
            id,
            zoneId,

            icon,
            name,

            // sectors,
            // trophies,

            color,

            // coins,
            // rubies,

            health,
            invaders,
            defenders,
            pos_lat,
            pos_lng,
            weapons,
            areal,
        } = result

        return PointerMapper.toDomain({
            id,
            zoneId,

            icon,
            name,

            // sectors,
            // trophies,

            color,

            // coins,
            // rubies,

            health,
            invaders,
            defenders,
            pos: [pos_lat, pos_lng],
            weapons: weapons && JSON.parse(weapons) || '',
            areal: areal
        })
    }

    async getZoneByIds(_ids: number[]): Promise<TZone[]> {

        const [result] = await this._connection.query<TZone[] & RowDataPacket[]>(
            `SELECT
                id as zone_id,
                name,
                color
            FROM
                pointers
            WHERE
                id IN (?);`,
            [_ids]
        )

        console.log('getColorsByIds _ids.join(',')', _ids.join(','))
        console.log('getColorsByIds result', result)
        if (!result) {
            throw new Error('----------')
        }

        console.log('getColorsByIds result', result)

        return result.map(pointer => ({
            zone_id: pointer.zone_id,
            name: pointer.name,
            color: pointer.color
        }))

    }

    async getByIds(_ids: number[]): Promise<Pointer[]> {
        const [result] = await this._connection.query<Required<IPointerRowData>[] & RowDataPacket[]>(
            `SELECT * FROM pointers WHERE id IN (?);`, [_ids]
        )
        if (!result) {
            throw new Error('----------')
        }

        return result.map(pointer => {
            const {
                id,
                zoneId,

                icon,
                name,

                // sectors,
                // trophies,

                color,

                // coins,
                // rubies,

                health,
                invaders,
                defenders,
                pos_lat,
                pos_lng,
                weapons,
                areal,
            } = pointer

            return PointerMapper.toDomain({
                id,
                zoneId,

                icon,
                name,

                // sectors,
                // trophies,

                color,

                // coins,
                // rubies,

                health,
                invaders,
                defenders,

                pos: [pos_lat, pos_lng],
                weapons: weapons && JSON.parse(weapons) || '',
                areal: areal
            })
        })

    }

    async insert(pointer: Pointer): Promise<Pointer> {
        const dtoPointer = pointer.unmarshal()

        const inserted = await this._connection.query(`
            INSERT INTO pointers(
                id,
                icon,
                name,
                color,
                health,
                invaders,
                defenders,
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
                ?,
                ?
            );
        `, [
            dtoPointer.id,
            // dtoPointer.zoneId,

            dtoPointer.icon,
            dtoPointer.name,

            // dtoPointer.sectors,
            // dtoPointer.trophies,

            dtoPointer.color,

            // dtoPointer.coins,
            // dtoPointer.rubies,

            dtoPointer.health,
            dtoPointer.invaders,
            dtoPointer.defenders,
            dtoPointer.pos[0],
            dtoPointer.pos[1],
            JSON.stringify(dtoPointer.weapons),
            dtoPointer.areal
        ])

        return pointer
    }

    async update(pointer: Pointer): Promise<Pointer> {
        const dtoPointer = pointer.unmarshal()
        let arr: any[] = []
        const arrQuerySet = entries(dtoPointer).map((item) => {
            if (!item) return ''

            if (item[0] === 'pos') {
                arr.push(item[1][0])
                arr.push(item[1][1])
                return [
                    `'pos_lat' = ?`,
                    `'pos_lng' = ?`
                ]

            }
            if (item[0] === 'weapons') {
                arr.push(JSON.stringify(item[1]))
                return `${item[0]} = '?'`
            }
            arr.push(item[1])
            return `${item[0]} = ?`
        })

        const updated = await this._connection.execute(`
            UPDATE pointers SET ${arrQuerySet.join(',')} WHERE id = ?
        `, [...arr, pointer.id])

        return PointerMapper.toDomain(dtoPointer)
    }

    async delete(userId: number): Promise<Boolean> {
        try {
            const updated = await this._connection.execute(`DELETE FROM pointers id = ?`, [userId])
            return true
        } catch (e) {
            return false
        }
    }

}
