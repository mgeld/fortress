"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootyMap = void 0;
const fort_1 = require("entities/fort");
const booty_popup_1 = __importDefault(require("entities/fort/ui/booty-popup"));
const BootyMap = () => {
    const data = fort_1.fortModel.selectors.useContainerFort().data;
    if (!data)
        return <></>;
    return (<booty_popup_1.default cont={data.cont} fort={data.fort}/>);
};
exports.BootyMap = BootyMap;
