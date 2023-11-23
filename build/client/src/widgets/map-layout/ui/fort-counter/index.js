"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortCounter = void 0;
const fort_1 = require("entities/fort");
const defense_counter_1 = __importDefault(require("entities/fort/ui/defense-counter"));
const FortCounter = () => {
    const data = fort_1.fortModel.selectors.useTakeFort().data;
    const cont = fort_1.fortModel.selectors.useContainerFort().data;
    if (!data || cont)
        return <></>;
    return (<defense_counter_1.default {...data}/>);
};
exports.FortCounter = FortCounter;
