// import { injectable, inject } from 'inversify'
// import { IArenaTeamRepository } from '../../../../entities/repository'
// import { TYPES } from '../../../../types'
// import { MemoryData } from '../memory-data'
// import { Team, UnmarshalledTeam } from '../../../../entities/arena/arena-team'
// import { ArenaTeamMapper } from '../../mappers/arena-team'

// @injectable()
// export class ArenaTeamMemoryRepository implements IArenaTeamRepository {
//     constructor(
//         @inject(TYPES.Database) private _database: MemoryData
//     ) {}

//     async insert(team: Team): Promise<Team> {
//         const dtoTeam = team.unmarshal()
//         const inserted = await this._database.arenaTeam.insert<UnmarshalledTeam>(dtoTeam)
//         return ArenaTeamMapper.toDomain(inserted)
//     }

//     async getById(teamId: string): Promise<Team> {
//         const team = await this._database.arenaTeam.getById<UnmarshalledTeam>(teamId)
//         if (!team) {
//             throw new Error('----------')
//         }
//         return ArenaTeamMapper.toDomain(team)
//     }

//     async getByIds(teamIds: string[]): Promise<Team[]> {
//         console.log('team repository getByIds teamIds', teamIds)
//         const teams = await this._database.arenaTeam.getByIds<UnmarshalledTeam>(teamIds)
//         if (!teams) {
//             throw new Error('----------')
//         }
//         return teams.map(team => ArenaTeamMapper.toDomain(team))
//     }

//     async update(team: Team): Promise<Team> {
//         const dtoTeam = team.unmarshal()
//         const updated = await this._database.arenaTeam.update<UnmarshalledTeam>(
//             dtoTeam.id,
//             dtoTeam,
//         )
//         return ArenaTeamMapper.toDomain(updated)
//     }

//     async delete(teamId: string): Promise<Boolean> {
//         return await this._database.arenaTeam.delete(teamId)
//     }

//     async getByArenasTeams(arenas: string[]): Promise<UnmarshalledTeam[]> {
//         const teams = await this._database.arenaSector.findAll<UnmarshalledTeam>()
//         if (!teams) {
//             throw new Error('----------')
//         }
//         return teams.filter(team => ~arenas.findIndex(arena => team.arena === arena))
//     }

//     async deleteByArenas(arenas: string[]): Promise<Boolean> {

//         const _teams = await this.getByArenasTeams(arenas)

//         try {
//             _teams.forEach(async team => {
//                 await this._database.arenaTeam.delete(team.id)
//             })
//             console.log('deleteByArenas true')
//             return true
//         } catch (e) {
//             console.log('deleteByArenas false')
//             return false
//         }
//     }
// }

export {}
