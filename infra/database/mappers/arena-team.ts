import { Team, UnmarshalledTeam } from "../../../entities/arena/arena-team";

export class ArenaTeamMapper {
    public static toDomain(team: UnmarshalledTeam): Team {
        return Team.create(team)
    }
}