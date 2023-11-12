"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePos = void 0;
let left_lat = (a, b) => b.pos[1] - a.pos[1];
let right_lat = (a, b) => a.pos[1] - b.pos[1];
let forward_long = (a, b) => a.pos[0] - b.pos[0];
let backword_long = (a, b) => b.pos[0] - a.pos[0];
const comparePos = (direction) => {
    switch (direction) {
        case 'FORWARD':
            return forward_long;
        case 'BACKWARD':
            return backword_long;
        case 'LEFT':
            return left_lat;
        case 'RIGHT':
            return right_lat;
    }
};
exports.comparePos = comparePos;
