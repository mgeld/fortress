"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewRankHandler = void 0;
const __1 = require("..");
const notice_1 = require("shared/ui/notice");
const events_1 = require("shared/api/events");
const ranks_1 = require("entities/user/lib/ranks");
class NewRankHandler extends __1.Handler {
    handle(message) {
        events_1.userAPI.events.setRankLevel(message.payload.rank);
        events_1.userAPI.events.setRankExp(0);
        events_1.zoneAPI.events.addRubies(ranks_1.Ranks.getLevelRewardRubies(message.payload.rank));
        notice_1.noticeModel.events.newToast({
            name: 'Новый Ранг Завоеваний!',
            text: 'Вы достигли нового Ранга Завоеваний!',
            t: 'rank'
        });
    }
}
exports.NewRankHandler = NewRankHandler;
NewRankHandler.EVENT = 'new-rank';
