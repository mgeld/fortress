import { inject, injectable } from "inversify";
import { Pointer } from "../entities/pointer/pointer";
import { IPointerRepository } from "../entities/repository";
import { TYPES } from "../types";

@injectable()
export class PointerService {
    @inject(TYPES.PointerMemoryRepository) private _repository!: IPointerRepository

    insert(pointer: Pointer): Promise<Pointer> {
        return this._repository.insert(pointer)
    }

    getById(userId: number): Promise<Pointer> {
        return this._repository.getById(userId)
    }

    getByIds(userIds: number[]): Promise<Pointer[]> {
        console.log('getByIds')
        return this._repository.getByIds(userIds)
    }

    async update(pointer: Pointer) {
        await this._repository.update(pointer)
    }

    remove(userId: number) {
        this._repository.delete(userId)
    }
}