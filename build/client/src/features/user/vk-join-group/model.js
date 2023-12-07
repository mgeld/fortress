"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVkJoinGroup = void 0;
const zone_1 = require("entities/zone");
const effector_1 = require("effector");
const popout_root_1 = require("shared/ui/popout-root");
const initVkJoinGroup = () => { };
exports.initVkJoinGroup = initVkJoinGroup;
const isMessageFx = (0, effector_1.createEffect)(({ sectors, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (sectors === 3) {
        setTimeout(() => popout_root_1.popoutModel.events.setPopout('vk-join-group'), 3000);
    }
}));
(0, effector_1.sample)({
    clock: zone_1.zoneModel.events.addSector,
    source: {
        sectors: zone_1.zoneModel.$zoneSectorsStore,
    },
    target: isMessageFx
});
