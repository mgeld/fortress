"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaMapper = void 0;
const arena_1 = require("../../../entities/arena/arena");
const arena_place_1 = require("../../../entities/arena/arena-place");
const arena_team_1 = require("../../../entities/arena/arena-team");
class ArenaMapper {
    static toDomain(arena) {
        return arena_1.Arena.create({
            id: arena.id,
            place: arena_place_1.ArenaPlace.create(arena.place),
            registr: arena.registr,
            status: arena.status,
            teams: arena.teams.map(team => {
                return arena_team_1.Team.create({
                    id: team.id,
                    status: team.status,
                    members: team.members,
                    sectors: team.sectors,
                    alive_members: team.alive_members
                });
            })
        });
    }
}
exports.ArenaMapper = ArenaMapper;
