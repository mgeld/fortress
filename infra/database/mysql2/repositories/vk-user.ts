import { injectable, inject } from 'inversify'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { TYPES } from '../../../../types'

export interface IVkUserRowData {
    user_id: number
    zone_id: number
    is_msg: number
    is_group: number
    date?: number
}

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

    async insert(user: IVkUserRowData) {

        const date_reg = Math.floor(new Date().getTime() / 1000)

        const inserted = await this._connection.execute(`
            INSERT INTO vk_users(
                user_id,
                zone_id,
                date
            )VALUES(
                ?,
                ?,
                ?
            );
        `, [
            user.user_id,
            user.zone_id,
            date_reg
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
