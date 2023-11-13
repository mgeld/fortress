"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapBottom = void 0;
const map_1 = require("entities/map");
const bottom_1 = require("features/user/select-place/ui/bottom");
const control_1 = require("widgets/control");
const MapBottom = () => {
    const mode = map_1.mapModel.selectors.useMapMode().mode;
    if (mode === 'invade')
        return <control_1.Control />;
    if (mode === 'battle')
        return <control_1.Control />;
    if (mode === 'select-place')
        return <bottom_1.BottomSelectPlace />;
    else
        return <></>;
};
exports.MapBottom = MapBottom;
