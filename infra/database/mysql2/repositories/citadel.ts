import { injectable, inject } from 'inversify'
import { Pool, RowDataPacket } from 'mysql2/promise'
import { entries } from '../../../../libs/object-entries'
import { TYPES } from '../../../../types'
import { ICitadelMemoryRepository, IPointerRepository } from '../../../../entities/repository'
import { TLatLng, TZone } from '../../../../common-types/model'
import { Citadel } from '../../../../entities/citadel/citadel'
import { CitadelMapper } from '../../mappers/citadel'

interface ICitadelRowData {
    userId?: number
    sectorId?: string
    latlng?: TLatLng
    level?: number
}

@injectable()
export class CitadelRepository implements ICitadelMemoryRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async getById(_id: number): Promise<Citadel> {
        const [[result]] = await this._connection.query<Required<ICitadelRowData>[] & RowDataPacket[]>(
            `SELECT * FROM citadels WHERE id = ?;`, [_id]
        )
        if (!result) {
            throw new Error('----------')
        }

        const {
            userId,
            sectorId,
            latlng,
            level,
        } = result

        return CitadelMapper.toDomain({
            id: userId,
            sectorId,
            latlng,
            level
        })
    }

    async insert(citadel: Citadel): Promise<Citadel> {
        const dtoCitadel = citadel.unmarshal()

        const inserted = await this._connection.query(`
            INSERT INTO citadels(
                userId,
                sectorId,
                latlng,
                level
            )VALUES(
                ?,
                ?,
                ?,
                ?
            );
        `, [
            dtoCitadel.id,
            dtoCitadel.sectorId,
            JSON.stringify(dtoCitadel.latlng),
            dtoCitadel.level
        ])

        return citadel
    }

    async update(citadel: Citadel): Promise<Citadel> {
        const dtoCitadel = citadel.unmarshal()
        let arr: any[] = []
        const arrQuerySet = entries(dtoCitadel).map((item) => {
            if (!item) return ''

            if (item[0] === 'latlng') {
                arr.push(JSON.stringify(item[1]))
                return `${item[0]} = '?'`
            }
            arr.push(item[1])
            return `${item[0]} = ?`
        })

        const updated = await this._connection.execute(`
            UPDATE citadels SET ${arrQuerySet.join(',')} WHERE userId = ?
        `, [...arr, citadel.id])

        return citadel
    }

    async delete(userId: number): Promise<Boolean> {
        try {
            const updated = await this._connection.execute(`DELETE FROM citadels userId = ?`, [userId])
            return true
        } catch (e) {
            return false
        }
    }

}
