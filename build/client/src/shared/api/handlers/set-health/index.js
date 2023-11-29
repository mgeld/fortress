"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetHealthHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SetHealthHandler extends __1.Handler {
    handle(message) {
        const userId = message.payload.userId;
        const health = message.payload.health;
        events_1.pointersAPI.events.setHealthPointer({
            health: health,
            userId: userId
        });
    }
}
exports.SetHealthHandler = SetHealthHandler;
SetHealthHandler.EVENT = 'set-health';
