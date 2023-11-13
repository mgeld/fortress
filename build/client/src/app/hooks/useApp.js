"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApp = void 0;
const react_1 = require("react");
const model_1 = require("shared/api/socket/model");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const user_1 = require("entities/user");
const connect_user_1 = require("features/user/connect-user");
const useApp = () => {
    const vkUserId = user_1.userModel.selectors.useVkUserId();
    const socketStatus = (0, model_1.useSocket)();
    (0, react_1.useEffect)(() => {
        vk_bridge_1.default.send('VKWebAppGetUserInfo').then(user => {
            console.log('VKWebAppGetUserInfo user', user);
            user_1.userModel.events.setVkUser(user.id);
            user_1.userModel.events.setName(user.first_name);
            user_1.userModel.events.setUserIcon(user.photo_100);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        console.log('useEffect vkUserId', vkUserId);
        console.log('useEffect socketStatus', socketStatus);
        if (vkUserId > 0 && socketStatus === 'open') {
            const url = window.location.search;
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
