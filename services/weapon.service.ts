import { TYPES } from "../types";
import { Gun } from "../entities/weapon/gun";
import { inject, injectable } from "inversify";
import { WeaponType } from "../entities/weapon/types";
import { EntityIdGenerator } from "../domain/entityId";
import { IWeaponMemoryRepository, IWeaponRepository } from "../entities/repository";

@injectable()
export class WeaponService {
    @inject(TYPES.WeaponRepository) private _baseRepository!: IWeaponRepository
    @inject(TYPES.Base64EntityIdGenerator) private _entityId!: EntityIdGenerator
    @inject(TYPES.WeaponMemoryRepository) private _memoryRepository!: IWeaponMemoryRepository

    createGun(): WeaponType {
        const _weapon = Gun.create({
            id: this._entityId.nextIdEntity().id,
            status: 1
        })
        return _weapon
    }

    async memoryGetById(id: string): Promise<WeaponType> {
        return this._memoryRepository.getById(id)
    }

    async memoryInsert(weapon: WeaponType): Promise<WeaponType> {
        return this._memoryRepository.insert(weapon)
    }

    async baseInsert(weapon: WeaponType): Promise<WeaponType> {
        return this._baseRepository.insert(weapon)
    }

    async baseGetById(id: string): Promise<WeaponType> {
        return this._baseRepository.getById(id)
    }

    async memoryUpdate(weapon: WeaponType) {
        const _weapon = await this._memoryRepository.update(weapon)
    }

    async baseUpdate(weapon: WeaponType) {
        const _weapon = await this._baseRepository.update(weapon)
    }

    remove(id: string) {
        return this._memoryRepository.delete(id)
    }
}