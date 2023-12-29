"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSectorsHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class AddSectorsHandler extends __1.Handler {
    handle(message) {
        console.log('AddSectorsHandler');
        events_1.sectorsAPI.events.addSectors(message.payload);
    }
}
exports.AddSectorsHandler = AddSectorsHandler;
AddSectorsHandler.EVENT = 'add-sectors';
