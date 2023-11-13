"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortDetailsMap = void 0;
const fort_1 = require("entities/fort");
const details_popup_1 = __importDefault(require("entities/fort/ui/details-popup"));
const FortDetailsMap = () => {
    const fort = fort_1.fortModel.selectors.useFort().data;
    if (!fort)
        return <></>;
    return (<details_popup_1.default fort={fort}/>);
};
exports.FortDetailsMap = FortDetailsMap;
