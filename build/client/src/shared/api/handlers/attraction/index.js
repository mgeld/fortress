"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttractionHandler = void 0;
const __1 = require("..");
const events_1 = require("shared/api/events");
const notice_1 = require("shared/ui/notice");
const snackbar_1 = require("shared/ui/snackbar");
class AttractionHandler extends __1.Handler {
    handle(message) {
        const BOOTY_ID = Date.now();
        const to_pos = message.payload.pos;
        const from_pos = message.payload.fort;
        const type = message.payload.type;
        if (!type) {
            snackbar_1.snackbarModel.events.newToast({
                text: 'Ничего не притянулось',
                t: 8
            });
            return;
        }
        if (type === 'cont') {
            const cont = message.payload.data.cont;
            const extr = message.payload.data.extr;
            let _booty = {
                id: BOOTY_ID,
                unit: cont,
                to_pos,
                from_pos,
            };
            events_1.projectorAPI.events.addBooty(_booty);
            setTimeout(() => {
                events_1.projectorAPI.events.delBootyById({ booty_id: BOOTY_ID });
                events_1.holdAPI.events.addExtraction(extr);
                let typeNotice = ('cont_' + cont);
                notice_1.noticeModel.events.newToast({
                    name: 'Получен контейнер',
                    text: 'Предмет из контейнера добавлен в трюм корабля',
                    t: typeNotice
                });
            }, 2200);
        }
        else if (type === 'strm') {
            let _booty = {
                id: BOOTY_ID,
                unit: 10,
                to_pos,
                from_pos,
            };
            events_1.projectorAPI.events.addBooty(_booty);
            events_1.stormAPI.events.addInvaders(1);
            setTimeout(() => {
                events_1.projectorAPI.events.delBootyById({ booty_id: BOOTY_ID });
                snackbar_1.snackbarModel.events.newToast({
                    text: 'Штурмовик возвращен',
                    t: 11
                });
            }, 2200);
        }
    }
}
exports.AttractionHandler = AttractionHandler;
AttractionHandler.EVENT = 'attraction';
