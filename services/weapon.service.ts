import { inject, injectable } from "inversify";
import { EntityIdGenerator } from "../domain/entityId";
import { IWeaponMemoryRepository, IWeaponRepository } from "../entities/repository";
import { Weapon, WeaponType } from "../entities/weapon/weapon";
import { TYPES } from "../types";

@injectable()
export class WeaponService {
    @inject(TYPES.WeaponMemoryRepository) private _memoryRepository!: IWeaponMemoryRepository
    @inject(TYPES.WeaponRepository) private _baseRepository!: IWeaponRepository
    @inject(TYPES.Base64EntityIdGenerator) private _entityId!: EntityIdGenerator

    createGun(weapon: WeaponType): Weapon {
        const _weapon = Weapon.create({
            id: this._entityId.nextIdEntity().id,
            weapon: weapon,
            bullets: 100
        })
        return _weapon
    }

    async memoryGetById(id: string): Promise<Weapon> {
        return this._memoryRepository.getById(id)
    }

    async memoryInsert(weapon: Weapon): Promise<Weapon> {
        return this._memoryRepository.insert(weapon)
    }

    async baseInsert(weapon: Weapon): Promise<Weapon> {
        return this._baseRepository.insert(weapon)
    }

    async baseGetById(id: string): Promise<Weapon> {
        return this._baseRepository.getById(id)
    }

    async memoryUpdate(weapon: Weapon) {
        const _weapon = await this._memoryRepository.update(weapon)
    }

    async baseUpdate(weapon: Weapon) {
        const _weapon = await this._baseRepository.update(weapon)
    }
}