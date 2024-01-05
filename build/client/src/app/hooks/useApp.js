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
const lock_screen_1 = require("shared/ui/lock-screen");
const popout_root_1 = require("shared/ui/popout-root");
const lost_internet_1 = require("processes/lost-internet");
const connect_user_1 = require("features/user/connect-user");
const socket_close_1 = require("processes/socket/socket-close");
const h3_js_1 = require("h3-js");
const page_root_1 = require("shared/ui/page-root");
const map_1 = require("entities/map");
const get_satellite_fort_1 = require("shared/api/get-satellite-fort");
const get_hash_to_sector_id_1 = require("shared/lib/get-hash-to-sector-id");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const get_hash_to_battle_id_1 = require("shared/lib/get-hash-to-battle-id");
const battle_1 = require("features/battle");
connect_user_1.userEvents.startConnectUser();
const useApp = () => {
    const vkUserId = user_1.userModel.selectors.useVkUserId();
    const zoneId = user_1.userModel.selectors.useUserId();
    const socketStatus = (0, model_1.useSocket)();
    (0, react_1.useEffect)(() => {
        window.addEventListener("offline", lost_internet_1.lostInternet);
        vk_bridge_1.default.send('VKWebAppGetUserInfo')
            .then(user => {
            setTimeout(() => user_1.userModel.events.setVkUser(user.id), 1500);
        })
            .catch(e => console.log('Error vk user_id', e))
            .finally(() => console.log('finally vk user_id'));
    }, [vkUserId]);
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
    (0, react_1.useEffect)(() => {
        const sectorId = (0, get_hash_to_sector_id_1.getHashToSectorId)();
        if (sectorId && socketStatus === 'open') {
            vk_bridge_1.default.send("VKWebAppSetLocation", { "location": "" });
            window.history.pushState("", document.title, window.location.pathname + window.location.search);
            const latlng = (0, h3_js_1.cellToLatLng)(sectorId);
            map_1.mapSatelliteModel.events.setMapSatellite({
                type: 'sector',
                latlng: latlng,
                name: 'Сектор',
            });
            page_root_1.pageModel.events.setPage('map-satellite');
            (0, get_satellite_fort_1.getSatelliteFortAPI)(latlng);
        }
    }, [socketStatus]);
    (0, react_1.useEffect)(() => {
        if (zoneId && socketStatus === 'open') {
            const battleHashId = (0, get_hash_to_battle_id_1.getHashToBattleId)();
            if (battleHashId) {
                vk_bridge_1.default.send("VKWebAppSetLocation", { "location": "" });
                window.history.pushState("", document.title, window.location.pathname + window.location.search);
                console.log('battleHashId', battleHashId);
                setTimeout(() => {
                    battle_1.battleConnectEvent.events.battleConnect(battleHashId);
                }, 2000);
            }
        }
    }, [socketStatus, zoneId]);
    return {
        zoneId,
        socketStatus
    };
};
exports.useApp = useApp;
