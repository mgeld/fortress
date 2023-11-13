"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firetLimitRigh = void 0;
const firetLimitRigh = ({ bounds, fire }) => {
    const northEast = bounds.getNorthEast();
    let stop_line = 0;
    let limit_to_pos = fire.to_pos;
    if (fire.hit_pos)
        if (northEast.lng > fire.hit_pos[1]) {
            stop_line = fire.hit_pos[1];
        }
        else {
            stop_line = northEast.lng;
        }
    else if (northEast.lng < fire.to_pos[1]) {
        stop_line = northEast.lng;
    }
    else {
        stop_line = fire.to_pos[1];
    }
    let time_fire = Math.floor((stop_line - fire.from_pos[1]) * 1000 / 2);
    if (fire.to_pos[1] > stop_line)
        limit_to_pos = [fire.to_pos[0], stop_line];
    return {
        time_fire,
        limit_to_pos
    };
};
exports.firetLimitRigh = firetLimitRigh;
