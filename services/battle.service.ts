import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Rooms } from "../api/socket/socket/rooms";
import { MemberService } from "../services/member.service";
import { Member } from "../entities/arena/arena-team-member";
import { ZoneService } from "../services/zone.service";
import { Arena } from "../entities/arena/arena";
import { ArenaService } from "./arena.service";

// Пробный класс. Так делать наверное нельзя
@injectable()
class BattleService {
    @inject(TYPES.Rooms) private _rooms!: Rooms
    @inject(TYPES.ZoneService) private _zoneService!: ZoneService
    @inject(TYPES.ArenaService) private _arenaService!: ArenaService
    @inject(TYPES.MemberService) private _memberService!: MemberService

    async overGame(arenaId: string) {

        console.log('BattleService overGame')

        const arena = await this._arenaService.getById(arenaId)

        arena.timeout && arena.destroyTimer()

        // Это всё запихнуть бы в EventEmitter
        // И обрабатывать в отдельном обработчике

        const _extraction: Record<number, {
            coins: number
            trophies: number
        }> = {}

        const members: Member[][] = []

        members[0] = await this._memberService.getByIds(arena.teamList[0].members)
        members[1] = await this._memberService.getByIds(arena.teamList[1].members)

        if (arena.status !== 'over') {

            const team1 = arena.getTeam(1).sectors
            const team2 = arena.getTeam(2).sectors

            const defeatTeamId = team1 < team2 ? 1 : team1 > team2 ? 2 : 0

            arena.completeBattle(defeatTeamId)
        }

        const teams = arena.teamList.map((team, index) => {

            const minTrophies = team.status === 'victory' ? 10 : team.status === 'defeat' ? -10 : 0

            return {
                teamId: team.id,
                status: team.status,
                sectors: team.sectors,
                members: members[index].map(member => {

                    const wonTrophies = Math.floor(member.damage / 10 + member.sectors)
                    const trophy = minTrophies > 0 ? minTrophies + wonTrophies : 0

                    _extraction[member.userId] = {
                        coins: trophy * 10,
                        trophies: trophy
                    }

                    return {
                        trophies: trophy,
                        coins: trophy * 5,
                        userId: member.userId,
                    }
                })
            }
        })

        const zones = await this._zoneService.memoryGetByIds([
            ...arena.teamList[0].members,
            ...arena.teamList[1].members
        ])

        zones.forEach(zone => {
            zone.setTrophies(_extraction[zone.id].trophies)
            zone.addCoins(_extraction[zone.id].coins)
        })
        await this._zoneService.memoryUpdates(zones)

        this._arenaService.mysqlInsertArena(arena)
        // this._arenaService.mysqlInsertsTeam(arena.teamList)
        this._arenaService.mysqlInsertsMembers([...members[0], ...members[1]])

        setTimeout(async () => {
            this._rooms.arenas.broadcast(arena.id, {
                event: 'battle-over',
                payload: {
                    teams
                }
            })
        }, 2000)

    }

}


// FireHandler.EVENT = 'fire'

export {
    BattleService
}