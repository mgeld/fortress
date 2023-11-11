"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPlace = void 0;
class MemberPlace {
    static generate(teamPlace, memberIndex) {
        if (memberIndex % 2 > 0) {
            return [
                teamPlace[0] + (memberIndex * 0.001),
                teamPlace[1]
            ];
        }
        return [
            teamPlace[0] - (memberIndex * 0.001),
            teamPlace[1]
        ];
    }
}
exports.MemberPlace = MemberPlace;
