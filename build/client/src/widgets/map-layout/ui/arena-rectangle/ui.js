"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaRectangle = void 0;
const arena_1 = require("entities/arena");
const model_1 = require("entities/areal/model");
const ArenaRectangle = () => {
    var _a;
    const place = (_a = arena_1.arenaModel.selectors.useArena().data) === null || _a === void 0 ? void 0 : _a.place;
    if (!place)
        return <></>;
    const bounds = model_1.Areal.getBounds(place);
    return (<arena_1.ArenaBorder bounds={bounds}/>);
};
exports.ArenaRectangle = ArenaRectangle;
