"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class FireHandler extends __1.Handler {
    handle(message) {
        var _a;
        const FIRE_ID = Date.now();
        const from_pos = message.payload.pos;
        const hit_pos = (_a = message.payload.hitPointer) === null || _a === void 0 ? void 0 : _a.pos;
        const direction = message.payload.direction;
        events_1.firesAPI.events.addFire({
            id: FIRE_ID,
            from_pos,
            to_pos: message.payload.to_pos,
            hit_pos,
            direction
        });
        setTimeout(() => {
            var _a, _b;
            events_1.firesAPI.events.delFireById({ fire_id: FIRE_ID });
            if ((_a = message.payload.hitPointer) === null || _a === void 0 ? void 0 : _a.userId) {
                events_1.firesAPI.events.hitFireInTarget({
                    hitUserId: message.payload.hitPointer.userId,
                    health: ((_b = message.payload.hitPointer) === null || _b === void 0 ? void 0 : _b.health) || 0
                });
            }
        }, 500);
    }
}
exports.FireHandler = FireHandler;
FireHandler.EVENT = 'fire';
