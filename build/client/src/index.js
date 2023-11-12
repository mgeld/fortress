"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("app"));
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
require("index.css");
const root = client_1.default.createRoot(document.getElementById('root'));
vk_bridge_1.default.send("VKWebAppInit");
root.render(<app_1.default />);
