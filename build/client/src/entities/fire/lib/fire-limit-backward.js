"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireLimitBackward = void 0;
const fireLimitBackward = ({ bounds, fire }) => {
    const southWest = bounds.getSouthWest();
    let stop_line = 0;
    let limit_to_pos = fire.to_pos;
    if (fire.hit_pos)
        if (southWest.lat < fire.hit_pos[0]) {
            stop_line = fire.hit_pos[0];
        }
        else {
            stop_line = southWest.lat;
        }
    else if (southWest.lat > fire.to_pos[0]) {
        stop_line = southWest.lat;
    }
    else {
        stop_line = fire.to_pos[0];
    }
    let time_fire = Math.floor((fire.from_pos[0] - stop_line) * 1000);
    if (fire.to_pos[0] < stop_line)
        limit_to_pos = [stop_line, fire.to_pos[1]];
    return {
        time_fire,
        limit_to_pos
    };
};
exports.fireLimitBackward = fireLimitBackward;
