"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseSatellite = void 0;
const ui_1 = require("shared/ui/button/ui");
const bottom_flex_1 = require("shared/ui/bottom-flex");
const get_sectors_1 = require("features/sector/get-sectors");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const go_back_1 = require("processes/go-back");
const CloseSatellite = () => {
    const closeSatellite = () => {
        get_sectors_1.sectorEvents.events.getSectorsStart();
        (0, go_back_1.goBack)();
    };
    return (<bottom_flex_1.BottomFlex text="Просмотр зоны" button={<ui_1.Button className={styles_module_scss_1.default.__button} radius={6} text="Закрыть" onClick={closeSatellite}/>}/>);
};
exports.CloseSatellite = CloseSatellite;
