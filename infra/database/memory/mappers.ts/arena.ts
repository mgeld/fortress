import { Arena, UnmarshalledArena } from "../../../../entities/arena/arena";
import { Team } from "../../../../entities/arena/arena-team";
import { Member } from "../../../../entities/arena/arena-team-member";

export class ArenaMapper {
    public static toDomain(arena: UnmarshalledArena): Arena {
        return Arena.create({
            id: arena.id,
            place: arena.place,
            registr: arena.registr,
            status: arena.status,
            teams: arena.teams.map(team => {
                return Team.create({
                    id: team.id,
                    status: team.status,
                    members: team.members.map(member => {
                        return Member.create(member)
                    })
                })
            })
        })
    }
}