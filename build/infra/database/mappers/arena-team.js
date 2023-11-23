"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaTeamMapper = void 0;
const arena_team_1 = require("../../../entities/arena/arena-team");
class ArenaTeamMapper {
    static toDomain(team) {
        return arena_team_1.Team.create(team);
    }
}
exports.ArenaTeamMapper = ArenaTeamMapper;
