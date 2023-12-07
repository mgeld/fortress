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
exports.VkJoinGroup = void 0;
const _icons_1 = require("shared/assets/icons/_icons");
const popout_root_1 = require("shared/ui/popout-root");
const violet_screen_1 = require("shared/ui/violet-screen");
const vk_allow_msg_1 = require("./api/vk-allow-msg");
const vk_join_group_1 = require("./api/vk-join-group");
const VkJoinGroup = () => {
    return (<violet_screen_1.VioletScreen name="Новости игры" icon={<_icons_1.IconSapphire width={60} height={60}/>} message="Подпишитесь на сообщество, чтобы быть в курсе новых событий в игре. В награду вы получите 50 кристаллов!" action={{
            text: 'Подписаться',
            _click: () => __awaiter(void 0, void 0, void 0, function* () {
                popout_root_1.popoutModel.events.setPopout(null);
                yield (0, vk_allow_msg_1.vkAllowMessages)();
                (0, vk_join_group_1.vkJoinGroup)();
            })
        }}/>);
};
exports.VkJoinGroup = VkJoinGroup;
