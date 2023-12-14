"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goBack = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const effector_1 = require("effector");
const page_root_1 = require("shared/ui/page-root");
const popout_root_1 = require("shared/ui/popout-root");
exports.goBack = (0, effector_1.createEvent)();
const backFx = (0, effector_1.createEffect)(({ history, popout }) => {
    if (popout) {
        popout_root_1.popoutModel.events.setPopout(null);
    }
    else {
        if (history.length > 1) {
            page_root_1.pageModel.events.delHistoryPage();
            page_root_1.pageModel.events.returnPage(history[0]);
        }
        else {
            vk_bridge_1.default.send("VKWebAppClose", { "status": "success" });
        }
    }
});
(0, effector_1.sample)({
    clock: exports.goBack,
    source: {
        history: page_root_1.pageModel.$historyStore,
        popout: popout_root_1.popoutModel.$popoutStore
    },
    target: backFx
});
