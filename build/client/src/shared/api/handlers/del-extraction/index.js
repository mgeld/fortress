"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelExtractionHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const popout_root_1 = require("shared/ui/popout-root");
const events_1 = require("shared/api/events");
const page_root_1 = require("shared/ui/page-root");
class DelExtractionHandler extends __1.Handler {
    handle(message) {
        popout_root_1.popoutModel.events.setPopout(null);
        page_root_1.pageModel.events.setPage('extraction');
        events_1.holdAPI.events.delExtraction(message.payload.index);
        notice_1.noticeModel.events.newToast({
            name: 'Удаление заверешено',
            text: 'Предмет был успешно удален из трюма!',
            t: message.payload.unit
        });
    }
}
exports.DelExtractionHandler = DelExtractionHandler;
DelExtractionHandler.EVENT = 'del-extraction';
