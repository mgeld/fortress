import { inject, injectable } from "inversify";
import { EntityIdGenerator } from "../domain/entityId";
import { IWeaponRepository } from "../entities/repository";
import { Gun } from "../entities/weapon/gun";
import { Weapon } from "../entities/weapon/weapon";
import { TYPES } from "../types";

@injectable()
export class WeaponService {
    @inject(TYPES.WeaponMemoryRepository) private _repository!: IWeaponRepository
    @inject(TYPES.Base64EntityIdGenerator) private _entityId!: EntityIdGenerator

    createGun(): Promise<Weapon> {
        const weapon = Weapon.create({
            id: this._entityId.nextIdEntity().id,
            weapon: Gun.level(1),
            bullets: 100
        })
        return this._repository.insert(weapon)
    }

    getById(id: string): Promise<Weapon> {
        return this._repository.getById(id)
    }

    async update(weapon: Weapon) {
        const _weapon = await this._repository.update(weapon)
        // pointer.health = pointer.health - 

    }

    remove(id: string) {
        this._repository.delete(id)
    }
}