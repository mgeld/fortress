import { Pool } from 'mysql2/promise'
import { TYPES } from '../../../../types'
import { injectable, inject } from 'inversify'
import { Arena } from '../../../../entities/arena/arena'
import { Team } from '../../../../entities/arena/arena-team'
import { IArenaRepository } from '../../../../entities/repository'
import { Member } from '../../../../entities/arena/arena-team-member'

@injectable()
export class ArenaRepository implements IArenaRepository {

    @inject(TYPES.connection) private _connection!: Pool

    async insertArena(arena: Arena) {
        const dtoArena = arena.unmarshal()

        const date = Math.floor(new Date().getTime() / 1000)

        const inserted = await this._connection.query(`
            INSERT INTO battles(
                id,
                date
            )VALUES(
                ?,
                ?
            );
        `, [
            dtoArena.id,
            date
        ])

        this.insertsTeam(arena.teamList, dtoArena.id)
    }

    private async insertsTeam(teams: Team[], arena: string) {
        if (teams.length === 0) {
            return false
        }

        const sqlTeams = teams.map(team => {
            const dtoTeam = team.unmarshal()
            let status =
                dtoTeam.status === 'victory' ? 1 :
                    dtoTeam.status === 'defeat' ? 2 :
                        dtoTeam.status === 'draw' ? 3 : 0
            return [
                dtoTeam.id,
                status,
                dtoTeam.sectors,
                dtoTeam.members.length,
                dtoTeam.alive_members,
                arena
            ]
        })

        const inserted = await this._connection.query(`
            INSERT INTO battle_teams(
                team_id,
                status,
                sectors,
                members,
                alive_members,
                battle_id
            )VALUES ?;
        `, [sqlTeams])
    }

    async insertsMember(members: Member[]) {
        if (members.length === 0) {
            return false
        }

        console.log('insertsMember')

        const sqlMembers = members.map(member => {
            const dtoMember = member.unmarshal()

            return [
                dtoMember.userId,
                dtoMember.killed,
                dtoMember.damage,
                dtoMember.sectors,
                dtoMember.arenaTeam,
                dtoMember.arena
            ]
        })

        const inserted = await this._connection.query(`
            INSERT INTO battle_members(
                zone_id,
                killed,
                damage,
                sectors,
                team_id,
                battle_id
            )VALUES ?;
        `, [sqlMembers])
    }

}
