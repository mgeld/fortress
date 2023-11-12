"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class TakeHandler extends __1.Handler {
    handle(message) {
        const TAKE_ID = Date.now();
        const from_pos = message.payload.position;
        const to_pos = message.payload.fort;
        console.log('TakeHandler addTake');
        events_1.takesAPI.events.addTake({
            id: TAKE_ID,
            from_pos,
            to_pos
        });
        setTimeout(() => {
            events_1.takesAPI.events.delTakeById({ take_id: TAKE_ID });
        }, 2000);
    }
}
exports.TakeHandler = TakeHandler;
TakeHandler.EVENT = 'take';
