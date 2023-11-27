"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectPointerHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class ConnectPointerHandler extends __1.Handler {
    handle(message) {
        console.log('ConnectPointerHandler handle');
        console.log('ConnectPointerHandler message.payload', message.payload);
        events_1.pointersAPI.events.newPointer(message.payload);
    }
}
exports.ConnectPointerHandler = ConnectPointerHandler;
ConnectPointerHandler.EVENT = "connect-pointer";
