"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApp = void 0;
const react_1 = require("react");
const model_1 = require("shared/api/socket/model");
const user_1 = require("entities/user");
const events_1 = require("shared/api/events");
const popout_root_1 = require("shared/ui/popout-root");
const lock_screen_1 = require("shared/ui/lock-screen");
const lost_internet_1 = require("processes/lost-internet");
const connect_user_1 = require("features/user/connect-user");
const socket_close_1 = require("processes/socket/socket-close");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
connect_user_1.userEvents.startConnectUser();
const useApp = () => {
    const vkUserId = user_1.userModel.selectors.useVkUserId();
    const socketStatus = (0, model_1.useSocket)();
    (0, react_1.useEffect)(() => {
        window.addEventListener("offline", lost_internet_1.lostInternet);
        vk_bridge_1.default.send('VKWebAppGetUserInfo').then(user => {
            setTimeout(() => user_1.userModel.events.setVkUser(user.id), 1500);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (vkUserId > 0 && socketStatus === 'close') {
            popout_root_1.popoutModel.events.setPopout('lock-screen');
            lock_screen_1.lockModel.events.setLockScreen({
                action: {
                    text: 'Переподключиться',
                    _click: () => (0, socket_close_1.reSocketClose)()
                },
                alert: 'Соединение потеряно',
                message: 'Соединение с сервером было потеряно. Возможно, вы подключились к игре с другого устройства.'
            });
        }
        if (vkUserId > 0 && socketStatus === 'open') {
            events_1.userAPI.events.connectUser();
            return;
        }
    }, [vkUserId, socketStatus]);
    return {
        vkUserId,
        socketStatus
    };
};
exports.useApp = useApp;
