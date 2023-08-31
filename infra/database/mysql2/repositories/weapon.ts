import { injectable, inject } from 'inversify'
import { IWeaponRepository } from '../../../../entities/repository'
import { UnmarshalledWeapon, Weapon } from '../../../../entities/weapon/weapon'
import { TYPES } from '../../../../types'
import { WeaponMapper } from '../../mappers/weapon'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { entries } from '../../../../libs/object-entries'

type IWeaponRowData = {
    number?: number
    id?: string
    weapon?: number
    bullets?: number
    level?: number
    status?: number
}

@injectable()
export class WeaponRepository implements IWeaponRepository {
    @inject(TYPES.connection) private _connection!: Pool

    async getWeapons(ids: string[]): Promise<Weapon[]> {
        const [result] = await this._connection.query<UnmarshalledWeapon[] & RowDataPacket[]>(
            `SELECT
                id,
                weapon,
                bullets,
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
        return result.map(weapon => WeaponMapper.toDomain(weapon))
    }

    async getById(_id: string): Promise<Weapon> {
        const [[result]] = await this._connection.query<UnmarshalledWeapon[] & RowDataPacket[]>(
            `SELECT
                id,
                weapon,
                bullets,
                level,
                status
            FROM
                weapons
            WHERE
                id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        return WeaponMapper.toDomain(result)

    }

    async insert(weapon: Weapon): Promise<Weapon> {
        const dtoWeapon = weapon.unmarshal()
        console.log('WEAPON ID ///// ', dtoWeapon.id)
        const inserted = await this._connection.execute(`
            INSERT INTO weapons(
                id,
                weapon,
                bullets,
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
            dtoWeapon.id,
            dtoWeapon.weapon,
            dtoWeapon.bullets,
            dtoWeapon.level,
            dtoWeapon.status,
        ])
        return weapon
    }

    async update(weapon: Weapon): Promise<Weapon> {
        
        const dtoWeapon = weapon.unmarshal()

        let arr: any[] = []
        const arrQuerySet = entries(dtoWeapon).map((item) => {
            arr.push(item[1])
            return `${item[0]} = ?`
        })

        const updated = await this._connection.execute(`
            UPDATE weapons SET ${arrQuerySet.join(',')} WHERE id = ?
        `, [...arr, weapon.id])

        return weapon
    }

}
