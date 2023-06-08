import { injectable, inject } from 'inversify'
import { Pointer, UnmarshalledPointer } from '../../../../entities/pointer/pointer'
import { IPointerRepository } from '../../../../entities/repository'
import { TYPES } from '../../../../types'
import { PointerMapper } from '../mappers/pointer'
import { MemoryData } from '../memory-data'

@injectable()
export class PointerMemoryRepository implements IPointerRepository {
    @inject(TYPES.Database) private _database!: MemoryData

    // async findAll(arenaId: number): Promise<Pointer[]> {
    //     const pointers = await (<Promise<UnmarshalledPointer[]>>(
    //         this._database.pointer.findAll()
    //     ))
    //     return pointers.map((item) => PointerMapper.toDomain(item)).filter(item => item.unmarshal().userId)
    // }

    async getById(userId: number): Promise<Pointer> {
        const pointer = await this._database.pointer.getById<UnmarshalledPointer>(userId)
        if (!pointer) {
            throw new Error('----------')
        }
        return PointerMapper.toDomain(pointer)
    }

    async getByIds(userIds: number[]): Promise<Pointer[]> {
        const pointers = await this._database.pointer.getByIds<UnmarshalledPointer>(userIds)
        if (!pointers) {
            throw new Error('----------')
        }

        return pointers.map(pointer => PointerMapper.toDomain(pointer))
    }

    async insert(pointer: Pointer): Promise<Pointer> {
        const dtoPointer = pointer.unmarshal()
        const inserted = await this._database.pointer.insert<UnmarshalledPointer>(dtoPointer)
        return PointerMapper.toDomain(inserted)
    }

    async update(pointer: Pointer): Promise<Pointer> {

        console.log('-----update pointer')
        const dtoPointer = pointer.unmarshal()
        console.log('-----update dtoPointer', dtoPointer)
        const updated = await this._database.pointer.update<UnmarshalledPointer>(
            dtoPointer.id,
            dtoPointer,
        )

        return PointerMapper.toDomain(updated)
    }

    async delete(userId: number): Promise<Boolean> {
        return await this._database.pointer.delete(userId)
    }

}
