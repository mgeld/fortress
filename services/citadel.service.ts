import { inject, injectable } from "inversify";
import { ICitadelRepository, } from "../entities/repository";
import { TYPES } from "../types";
import { Citadel, TCitadelProps } from "../entities/citadel/citadel";

type TCreateCitadelProps = Omit<TCitadelProps, 'level'>

@injectable()
export class CitadelService {
    @inject(TYPES.CitadelRepository) private _baseRepository!: ICitadelRepository
    // @inject(TYPES.CitadelMemoryRepository) private _memoryRepository!: ICitadelMemoryRepository

    create({
        id,
        latlng,
        sectorId,
    }: TCreateCitadelProps): Citadel {
        return Citadel.create({
            id,
            level: 1,
            sectorId,
            latlng
        })
    }

    baseInsert(citadel: Citadel): Promise<Citadel> {
        return this._baseRepository.insert(citadel)
    }

    getById(userId: number): Promise<Citadel> {
        return this._baseRepository.getById(userId)
    }

    async baseUpdate(citadel: Citadel) {
        await this._baseRepository.update(citadel)
    }

    // remove(sectorId: string) {
    //     this._memoryRepository.delete(sectorId)
    // }

}