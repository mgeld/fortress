"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSectorsHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SetSectorsHandler extends __1.Handler {
    handle(message) {
        console.log('SetSectorsHandler message', message);
        events_1.sectorsAPI.events.setSectors(message.payload);
    }
}
exports.SetSectorsHandler = SetSectorsHandler;
SetSectorsHandler.EVENT = 'set-sectors';
