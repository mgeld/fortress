"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseSatellite = void 0;
const get_sectors_1 = require("features/sector/get-sectors");
const events_1 = require("shared/api/events");
const bottom_flex_1 = require("shared/ui/bottom-flex");
const ui_1 = require("shared/ui/button/ui");
const page_root_1 = require("shared/ui/page-root");
const CloseSatellite = () => {
    const closeSatellite = () => {
        events_1.ratingAPI.events.selectRatingZone(null);
        get_sectors_1.sectorEvents.events.getSectorsStart();
        page_root_1.pageModel.events.setPage('map');
    };
    return (<bottom_flex_1.BottomFlex text="Просмотр зоны" button={<ui_1.Button className="" radius={6} text="Закрыть" onClick={closeSatellite}/>}/>);
};
exports.CloseSatellite = CloseSatellite;
