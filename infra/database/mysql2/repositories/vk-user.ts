import { injectable, inject } from 'inversify'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { TYPES } from '../../../../types'


interface IVkUserRowData {
    user_id: number
    zone_id: number
}

@injectable()
export class VkUserRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async getById(_id: number): Promise<IVkUserRowData> {
        console.log('______________id', _id)
        const [[result]] = await this._connection.query<Required<IVkUserRowData>[] & RowDataPacket[]>(
            `SELECT * FROM vk_users WHERE user_id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('-НУ ну сработал запрос.---------')
        }

        return result
    }

    async getByIds(_ids: number[]): Promise<IVkUserRowData[]> {
        const [result] = await this._connection.query<Required<IVkUserRowData>[] & RowDataPacket[]>(
            `SELECT * FROM vk_users WHERE user_id IN (?);`, [_ids]
        )
        if (!result) {
            throw new Error('----------')
        }

        return result
    }

    async insert(user: IVkUserRowData) {

        console.log('______user', user)

        const inserted = await this._connection.execute(`
            INSERT INTO vk_users(
                user_id,
                zone_id
            )VALUES(
                ?,
                ?
            );
        `, [
            user.user_id,
            user.zone_id
        ])

        if (!inserted) {
            throw new Error('----------')
        }
    }

}
