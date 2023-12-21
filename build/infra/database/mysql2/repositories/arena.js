"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaRepository = void 0;
const types_1 = require("../../../../types");
const inversify_1 = require("inversify");
let ArenaRepository = class ArenaRepository {
    insertArena(arena) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtoArena = arena.unmarshal();
            const date = Math.floor(new Date().getTime() / 1000);
            const inserted = yield this._connection.query(`
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
            ]);
            this.insertsTeam(arena.teamList, dtoArena.id);
        });
    }
    insertsTeam(teams, arena) {
        return __awaiter(this, void 0, void 0, function* () {
            if (teams.length === 0) {
                return false;
            }
            console.log('insertsTeam');
            const sqlTeams = teams.map(team => {
                const dtoTeam = team.unmarshal();
                let status = dtoTeam.status === 'victory' ? 1 :
                    dtoTeam.status === 'defeat' ? 2 :
                        dtoTeam.status === 'draw' ? 3 : 0;
                return [
                    dtoTeam.id,
                    status,
                    dtoTeam.sectors,
                    dtoTeam.members.length,
                    dtoTeam.alive_members,
                    arena
                ];
            });
            const inserted = yield this._connection.query(`
            INSERT INTO battle_teams(
                team_id,
                status,
                sectors,
                members,
                alive_members,
                battle_id
            )VALUES ?;
        `, [sqlTeams]);
        });
    }
    insertsMember(members) {
        return __awaiter(this, void 0, void 0, function* () {
            if (members.length === 0) {
                return false;
            }
            console.log('insertsMember');
            const sqlMembers = members.map(member => {
                const dtoMember = member.unmarshal();
                return [
                    dtoMember.userId,
                    dtoMember.killed,
                    dtoMember.damage,
                    dtoMember.sectors,
                    dtoMember.arenaTeam,
                    dtoMember.arena
                ];
            });
            const inserted = yield this._connection.query(`
            INSERT INTO battle_members(
                zone_id,
                killed,
                damage,
                sectors,
                team_id,
                battle_id
            )VALUES ?;
        `, [sqlMembers]);
        });
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.connection),
    __metadata("design:type", Object)
], ArenaRepository.prototype, "_connection", void 0);
ArenaRepository = __decorate([
    (0, inversify_1.injectable)()
], ArenaRepository);
exports.ArenaRepository = ArenaRepository;
