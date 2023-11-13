"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttractionHandler = void 0;
const __1 = require("..");
const events_1 = require("shared/api/events");
const notice_1 = require("shared/ui/notice");
const snackbar_1 = require("shared/ui/snackbar");
class AttractionHandler extends __1.Handler {
    handle(message) {
        console.log('AttractionHandler');
        const BOOTY_ID = Date.now();
        const to_pos = message.payload.pos;
        const from_pos = message.payload.fort;
        const cont = message.payload.cont;
        const extr = message.payload.extr;
        if (!cont || !extr) {
            snackbar_1.snackbarModel.events.newToast({
                text: 'Ничего не притянулось',
                t: 8
            });
            return;
        }
        let typeNotice = ('cont_' + cont);
        let _booty = {
            id: BOOTY_ID,
            cont,
            to_pos,
            from_pos,
        };
        events_1.projectorAPI.events.addBooty(_booty);
        setTimeout(() => {
            events_1.projectorAPI.events.delBootyById({ booty_id: BOOTY_ID });
            events_1.holdAPI.events.addExtraction(extr);
            notice_1.noticeModel.events.newToast({
                name: 'Получен контейнер',
                text: 'Контейнер добавлен в инвентарь добычи',
                t: typeNotice
            });
        }, 2200);
    }
}
exports.AttractionHandler = AttractionHandler;
AttractionHandler.EVENT = 'attraction';
