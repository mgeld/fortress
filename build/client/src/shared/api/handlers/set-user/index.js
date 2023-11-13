"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SetUserHandler extends __1.Handler {
    handle(message) {
        console.log('SetUserHandler handle');
        const { user } = message.payload;
        if (user === null || user === void 0 ? void 0 : user.health)
            events_1.shipAPI.events.setHealth(user.health);
        if (user === null || user === void 0 ? void 0 : user.pos)
            events_1.shipAPI.events.setPos(user.pos);
    }
}
exports.SetUserHandler = SetUserHandler;
SetUserHandler.EVENT = "set-user";
