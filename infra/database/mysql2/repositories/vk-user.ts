import { injectable, inject } from 'inversify'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { TYPES } from '../../../../types'
import { TZoneAbduction } from '../../../../common-types/model'

export interface IVkUserRowData {
    user_id: number
    zone_id: number
    is_msg: number
    is_group: number
    ufo: number
    date?: number
}

// export interface IVkUserAbduction {
//     zone_id: number
//     sectors: number
//     date: number
// }


@injectable()
export class VkUserRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async getById(_id: number): Promise<IVkUserRowData> {
        const [[result]] = await this._connection.query<Required<IVkUserRowData>[] & RowDataPacket[]>(
            `SELECT * FROM vk_users WHERE user_id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('-НУ ну сработал запрос.---------')
        }
        return result
    }

    async getByUserIds(_ids: number[]): Promise<IVkUserRowData[]> {
        const [result] = await this._connection.query<Required<IVkUserRowData>[] & RowDataPacket[]>(
            `SELECT * FROM vk_users WHERE user_id IN (?);`, [_ids]
        )
        if (!result) {
            throw new Error('----------')
        }

        return result
    }

    async getByZoneId(_id: number): Promise<IVkUserRowData> {
        const [[result]] = await this._connection.query<Required<IVkUserRowData>[] & RowDataPacket[]>(
            `SELECT * FROM vk_users WHERE zone_id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        return result
    }

    async getByZoneIds(_ids: number[]): Promise<IVkUserRowData[]> {
        const [result] = await this._connection.query<Required<IVkUserRowData>[] & RowDataPacket[]>(
            `SELECT * FROM vk_users WHERE zone_id IN (?);`, [_ids]
        )
        if (!result) {
            throw new Error('----------')
        }

        return result
    }
    async getAbduction({
        ufo_id,
        page
    }: {
        ufo_id: number
        page: number
    }): Promise<TZoneAbduction[]> {

        const count = 20

        const start = (page - 1) * count
        const end = page * count

        const [result] = await this._connection.query<Required<TZoneAbduction>[] & RowDataPacket[]>(
            `
                SELECT
                    terrain.sectors,
                    vk.zone_id,
                    vk.date,
                    p.icon,
                    p.name
                FROM
                    vk_users as vk

                LEFT JOIN terrain ON terrain.zone_id = vk.zone_id
                LEFT JOIN pointers AS p ON p.zone_id = vk.zone_id

                WHERE vk.ufo = ?

                ORDER BY vk.date DESC

                LIMIT ?, ?;
            `, [
                ufo_id,
                start, end
            ])

        if (!result) {
            throw new Error('----------')
        }
        
        const zones = result.map(zone => ({ ...zone}))

        console.log('VkUserRepository getAbduction zones', zones)

        return zones
    }

    async insert(user: IVkUserRowData) {

        const date_reg = Math.floor(new Date().getTime() / 1000)

        const inserted = await this._connection.execute(`
            INSERT INTO vk_users(
                user_id,
                zone_id,
                date,
                ufo
            )VALUES(
                ?,
                ?,
                ?,
                ?
            );
        `, [
            user.user_id,
            user.zone_id,
            date_reg,
            user.ufo
        ])

        if (!inserted) {
            throw new Error('----------')
        }
    }

    async setMsg(vkId: number, is_msg: -1 | 1) {

        const inserted = await this._connection.execute(`
            UPDATE vk_users SET is_msg = ? WHERE user_id = ?
        `, [
            is_msg,
            vkId
        ])

        if (!inserted) {
            throw new Error('----------')
        }
    }

    async setGroup(vkId: number, join: -1 | 1) {

        const inserted = await this._connection.execute(`
            UPDATE vk_users SET is_group = ? WHERE user_id = ?
        `, [
            join,
            vkId
        ])

        if (!inserted) {
            throw new Error('----------')
        }
    }

}
