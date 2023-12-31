"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointIcon = void 0;
const leaflet_1 = require("leaflet");
const pointIcon = (iconUrl) => {
    if (!iconUrl)
        return undefined;
    return (0, leaflet_1.icon)({
        className: "icon-pointer",
        iconUrl,
        iconSize: [54, 70],
        iconAnchor: [27, 70],
    });
};
exports.pointIcon = pointIcon;
