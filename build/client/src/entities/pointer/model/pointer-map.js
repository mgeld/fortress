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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.effects = exports.events = exports.selectors = exports.$pointersStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const events_1 = require("shared/api/events");
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const DEFAULT_STORE = [];
const usePointers = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$pointersStore)
    };
};
const clearStore = (0, effector_1.createEvent)();
const { setPointers, newPointer, delPointer, updatePositionPointer, changeHealthPointer, setHealthPointer } = events_1.pointersAPI.events;
const getUsersFx = (0, effector_1.createEffect)(({ pointers, prevPointers }) => __awaiter(void 0, void 0, void 0, function* () {
    const user_ids = pointers.map(item => item.userId);
    return vk_bridge_1.default.send('VKWebAppCallAPIMethod', {
        method: 'users.get',
        params: {
            user_ids: user_ids.join(','),
            v: '5.131',
            fields: 'photo_50',
            access_token: '10811a2f10811a2f10811a2fdf1395cae51108110811a2f7425604c5854e1fbf0d0110c'
        }
    })
        .then((data) => {
        if (data && pointers.length > 0) {
            return [
                ...prevPointers,
                ...pointers.map(pointer => {
                    const user = data.response.find(user => user.id === pointer.userId);
                    return Object.assign(Object.assign({}, pointer), { icon: user === null || user === void 0 ? void 0 : user.photo_50, name: user === null || user === void 0 ? void 0 : user.first_name });
                })
            ];
        }
        else {
            return [];
        }
    })
        .catch((error) => {
        console.log(error);
        return [];
    });
}));
exports.$pointersStore = (0, effector_1.createStore)(DEFAULT_STORE)
    .on(setPointers, (_, pointers) => {
    return pointers;
})
    .on(newPointer, (prevPointers, pointer) => ([...prevPointers, pointer]))
    .on(delPointer, (prevPointers, data) => prevPointers.filter(pointer => pointer.userId !== data.userId))
    .on(updatePositionPointer, (prevPointers, data) => (prevPointers.map(pointer => {
    if (pointer.userId === data.userId)
        return Object.assign(Object.assign({}, pointer), { pos: data.pos });
    return pointer;
})))
    .on(changeHealthPointer, (prevPointers, data) => (prevPointers.map(prevPointer => prevPointer.userId === data.userId ? Object.assign(Object.assign({}, prevPointer), { health: prevPointer.health - data.health }) : prevPointer)))
    .on(setHealthPointer, (prevPointers, data) => (prevPointers.map(prevPointer => prevPointer.userId === data.userId ? Object.assign(Object.assign({}, prevPointer), { health: data.health }) : prevPointer)))
    .on(clearStore, () => (Object.assign({}, DEFAULT_STORE)));
exports.$pointersStore.watch(val => console.log('pointersStore watch', val));
exports.selectors = {
    usePointers,
};
exports.events = {
    clearStore
};
exports.effects = {
    getUsersFx
};
