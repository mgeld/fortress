import { injectable, inject } from 'inversify'
import { IWeaponMemoryRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { WeaponMapper } from '../../mappers/weapon'
import { MemoryData } from '../memory-data'
import { UnmarshalledWeapon, WeaponType } from '../../../../entities/weapon/types'

@injectable()
export class WeaponMemoryRepository implements IWeaponMemoryRepository {
    @inject(TYPES.Database) private _database!: MemoryData

    // async findAll(arenaId: number): Promise<Pointer[]> {
    //     const pointers = await (<Promise<UnmarshalledPointer[]>>(
    //         this._database.pointer.findAll()
    //     ))
    //     return pointers.map((item) => PointerMapper.toDomain(item)).filter(item => item.unmarshal().userId)
    // }

    async getWeapons(ids: string[]): Promise<WeaponType[]> {
        const weapons = await this._database.weapon.getByIds<UnmarshalledWeapon>(ids)
        if (!weapons) {
            throw new Error('----------')
        }
        return weapons.map(weapon => WeaponMapper.toDomain(weapon))
    }

    async getById(id: string): Promise<WeaponType> {
        const weapon = await this._database.weapon.getById<UnmarshalledWeapon>(id)
        if (!weapon) {
            throw new Error('WeaponMemoryRepository getById Error')
        }
        return WeaponMapper.toDomain(weapon)

    }

    async insert(weapon: WeaponType): Promise<WeaponType> {
        const dtoWeapon = weapon.unmarshal()
        const inserted = await this._database.weapon.insert<UnmarshalledWeapon>(dtoWeapon)
        return WeaponMapper.toDomain(inserted)
    }

    async update(weapon: WeaponType): Promise<WeaponType> {
        const dtoWeapon = weapon.unmarshal()
        const updated = await this._database.weapon.update<UnmarshalledWeapon>(
            dtoWeapon.id,
            dtoWeapon,
        )

        return WeaponMapper.toDomain(updated)
    }

    async delete(userId: string): Promise<Boolean> {
        return await this._database.weapon.delete(userId)
    }

}
