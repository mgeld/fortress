"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApp = void 0;
const react_1 = require("react");
const model_1 = require("shared/api/socket/model");
const randomNumber_1 = require("shared/lib/randomNumber");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const user_1 = require("entities/user");
const connect_user_1 = require("features/user/connect-user");
const useApp = () => {
    const vkUserId = user_1.userModel.selectors.useVkUserId();
    const socketStatus = (0, model_1.useSocket)();
    (0, react_1.useEffect)(() => {
        const _user = (0, randomNumber_1.randomNumber)(38574839 - 100000, 250449525 + 100000);
        vk_bridge_1.default.send('VKWebAppCallAPIMethod', {
            method: 'users.get',
            params: {
                user_ids: _user,
                v: '5.131',
                fields: 'photo_50',
                access_token: '10811a2f10811a2f10811a2fdf1395cae51108110811a2f7425604c5854e1fbf0d0110c'
            }
        }).then((data) => {
            user_1.userModel.events.setVkUser(_user);
            user_1.userModel.events.setName(data.response[0].first_name);
            user_1.userModel.events.setUserIcon(data.response[0].photo_50);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        console.log('useEffect vkUserId', vkUserId);
        console.log('useEffect socketStatus', socketStatus);
        if (vkUserId > 0 && socketStatus === 'open') {
            const url = window.location.search;
            console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmm url', url);
            connect_user_1.userEvents.events.connectUser(url);
            return;
        }
    }, [vkUserId, socketStatus]);
    return {
        vkUserId,
        socketStatus
    };
};
exports.useApp = useApp;
