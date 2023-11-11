"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberMapper = void 0;
const arena_team_member_1 = require("../../../entities/arena/arena-team-member");
class MemberMapper {
    static toDomain(member) {
        return arena_team_member_1.Member.create(member);
    }
}
exports.MemberMapper = MemberMapper;
