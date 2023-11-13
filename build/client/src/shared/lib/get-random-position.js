"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPosition = void 0;
const randomNumber_1 = require("shared/lib/randomNumber");
const rn = randomNumber_1.randomNumber;
const getRandomPosition = () => {
    return [
        +(String(rn(5, 5)) + rn(4, 7) + '.' + rn(1, 9) + rn(1, 9) + rn(1, 9) + rn(1, 9)),
        +(String(rn(5, 5)) + rn(4, 7) + '.' + rn(1, 9) + rn(1, 9) + rn(1, 9) + rn(1, 9)),
    ];
};
exports.getRandomPosition = getRandomPosition;
