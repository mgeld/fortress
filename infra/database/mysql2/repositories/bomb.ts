import { injectable, inject } from 'inversify'
import { IBombRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { entries } from '../../../../libs/object-entries'
import { Bomb, UnmarshalledBomb } from '../../../../entities/bomb/bomb'
import { BombMapper } from '../../mappers/bomb'

@injectable()
export class BombRepository implements IBombRepository {
    @inject(TYPES.connection) private _connection!: Pool

    async getBombs(ids: string[]): Promise<Bomb[]> {
        const [result] = await this._connection.query<UnmarshalledBomb[] & RowDataPacket[]>(
            `SELECT
                id,
                bomb,
                counter,
                level,
                status
            FROM
                weapons
            WHERE
                id IN (?);`, [ids]
        )
        if (!result) {
            throw new Error('----------')
        }
        return result.map(bomb => BombMapper.toDomain(bomb))
    }

    async getById(_id: string): Promise<Bomb> {
        const [[result]] = await this._connection.query<UnmarshalledBomb[] & RowDataPacket[]>(
            `SELECT
                id,
                bomb,
                counter,
                level,
                status
            FROM
                bombs
            WHERE
                id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        return BombMapper.toDomain(result)

    }

    async insert(bomb: Bomb): Promise<Bomb> {
        const dtoBomb = bomb.unmarshal()
        console.log('BOMB ID ///// ', dtoBomb.id)
        const inserted = await this._connection.execute(`
            INSERT INTO bombs(
                id,
                bomb,
                counter,
                level,
                status
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
            dtoBomb.id,
            dtoBomb.bomb,
            dtoBomb.counter,
            dtoBomb.level,
            dtoBomb.status,
        ])
        return bomb
    }

    async update(bomb: Bomb): Promise<Bomb> {

        const dtoBomb = bomb.unmarshal()

        let arr: any[] = []
        const arrQuerySet = entries(dtoBomb).map((item) => {
            arr.push(item[1])
            return `${item[0]} = ?`
        })

        const updated = await this._connection.execute(`
            UPDATE bombs SET ${arrQuerySet.join(',')} WHERE id = ?
        `, [...arr, bomb.id])

        return bomb
    }

}
