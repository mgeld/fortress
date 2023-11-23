import { Arena, UnmarshalledArena } from "../../../entities/arena/arena";
import { ArenaPlace } from "../../../entities/arena/arena-place";
import { Team } from "../../../entities/arena/arena-team";

export class ArenaMapper {
    public static toDomain(arena: UnmarshalledArena): Arena {

        return Arena.create({
            id: arena.id,
            place: ArenaPlace.create(arena.place),
            registr: arena.registr,
            status: arena.status,
            teams: arena.teams.map(team => {
                return Team.create({
                    id: team.id,
                    status: team.status,
                    members: team.members,
                    sectors: team.sectors,
                    alive_members: team.alive_members
                })
            })
        })

    }
}