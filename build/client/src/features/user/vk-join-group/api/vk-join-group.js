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
exports.vkJoinGroup = void 0;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const vkJoinGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    yield vk_bridge_1.default.send("VKWebAppJoinGroup", { "group_id": 223383803 })
        .then(data => {
        if (data.result) {
        }
        else {
        }
    })
        .catch(() => {
    });
});
exports.vkJoinGroup = vkJoinGroup;
