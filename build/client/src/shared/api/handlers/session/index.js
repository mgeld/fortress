"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionHandler = void 0;
const __1 = require("..");
const connect_user_1 = require("features/user/connect-user");
const lock_screen_1 = require("shared/ui/lock-screen");
const popout_root_1 = require("shared/ui/popout-root");
class SessionHandler extends __1.Handler {
    handle(message) {
        popout_root_1.popoutModel.events.setPopout('lock-screen');
        lock_screen_1.lockModel.events.setLockScreen({
            action: {
                text: 'Обновить',
                _click: () => {
                    popout_root_1.popoutModel.events.setPopout(null);
                    const url = window.location.search;
                    connect_user_1.userEvents.events.connectUser(url);
                }
            },
            alert: 'Ошибка подключения',
            message: 'Вы уже подключены к игре. Необходимо завершить другую сессию, чтобы начать играть тут'
        });
    }
}
exports.SessionHandler = SessionHandler;
SessionHandler.EVENT = 'session';
