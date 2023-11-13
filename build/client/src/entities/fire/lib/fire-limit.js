"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireLimit = void 0;
const fire_limit_left_1 = require("./fire-limit-left");
const fire_limit_right_1 = require("./fire-limit-right");
const fire_limit_forward_1 = require("./fire-limit-forward");
const fire_limit_backward_1 = require("./fire-limit-backward");
const fireLimit = ({ bounds, fire }) => {
    if (fire.direction === 'LEFT')
        return (0, fire_limit_left_1.fireLimitLeft)({ fire, bounds });
    if (fire.direction === 'RIGHT')
        return (0, fire_limit_right_1.firetLimitRigh)({ fire, bounds });
    if (fire.direction === 'FORWARD')
        return (0, fire_limit_forward_1.fireLimitForward)({ fire, bounds });
    return (0, fire_limit_backward_1.fireLimitBackward)({ fire, bounds });
};
exports.fireLimit = fireLimit;
