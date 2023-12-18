// import { inject, injectable } from "inversify";
// import { IArenaSectorMemoryRepository, IArenaTeamRepository } from "../entities/repository";
// import { TYPES } from "../types";
// import { ArenaSector, TArenaSectorProps } from "../entities/arena/sector";
// import { TTeamProps, Team } from "../entities/arena/arena-team";
// import { EntityIdGenerator } from "../domain/entityId";

// type TCreateSectorProps = Omit<TArenaSectorProps, 'areal'>

// @injectable()
// export class ArenaTeamService {
//     @inject(TYPES.ArenaTeamMemoryRepository) private _memoryRepository!: IArenaTeamRepository
//     @inject(TYPES.Base64EntityIdGenerator) private _entityId!: EntityIdGenerator

//     create({
//         arena
//     }: TTeamProps): Team {
//         return Team.create({
//             id: this._entityId.nextIdEntity().id,
//             arena
//         })
//     }

//     insert(team: Team): Promise<Team> {
//         return this._memoryRepository.insert(team)
//     }

//     getById(teamId: string): Promise<Team> {
//         return this._memoryRepository.getById(teamId)
//     }

//     getByIds(teamIds: string[]): Promise<Team[]> {
//         return this._memoryRepository.getByIds(teamIds)
//     }

//     async update(team: Team) {
//         await this._memoryRepository.update(team)
//     }

//     remove(teamId: string) {
//         this._memoryRepository.delete(teamId)
//     }

//     removeByArenas(arenas: string[]) {
//         this._memoryRepository.deleteByArenas(arenas)
//     }
// }

export {}