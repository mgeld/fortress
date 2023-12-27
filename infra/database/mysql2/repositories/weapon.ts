import { injectable, inject } from 'inversify'
import { IWeaponRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { WeaponMapper } from '../../mappers/weapon'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { entries } from '../../../../libs/object-entries'
import { UnmarshalledWeapon, WeaponType } from '../../../../entities/weapon/types'

type IWeaponRowData = {
    id?: string
    number?: number
    weapon?: number
    bullets?: number
    level?: number
    status?: number
}

@injectable()
export class WeaponRepository implements IWeaponRepository {
    @inject(TYPES.connection) private _connection!: Pool

    async getWeapons(ids: string[]): Promise<WeaponType[]> {
        const [result] = await this._connection.query<UnmarshalledWeapon[] & RowDataPacket[]>(
            `SELECT
                id,
                weapon,
                level,
                power,
                distance,
                bullets,
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

    async getById(_id: string): Promise<WeaponType> {
        const [[result]] = await this._connection.query<UnmarshalledWeapon[] & RowDataPacket[]>(
            `SELECT
                id,
                weapon,
                level,
                power,
                distance,
                bullets,
                status
            FROM
                weapons
            WHERE
                id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('GET WEAPON ERROR----------')
        }

        return WeaponMapper.toDomain(result)

    }

    async insert(weapon: WeaponType): Promise<WeaponType> {
        const dtoWeapon = weapon.unmarshal()
        const inserted = await this._connection.execute(`
            INSERT INTO weapons(
                id,
                weapon,
                level,
                power,
                distance,
                bullets,
                status
            )VALUES(
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            );
        `, [
            dtoWeapon.id,
            dtoWeapon.weapon,
            dtoWeapon.level,
            dtoWeapon.power,
            dtoWeapon.distance,
            dtoWeapon.bullets,
            dtoWeapon.status,
        ])
        return weapon
    }

    async update(weapon: WeaponType): Promise<WeaponType> {

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
