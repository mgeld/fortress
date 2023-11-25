"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointIcon = void 0;
const react_1 = require("react");
const point_icon_1 = require("widgets/map-layout/lib/point-icon");
const react_leaflet_1 = require("react-leaflet");
const create_pointer_1 = require("../lib/create-pointer");
const PointIcon = ({ userIcon, position }) => {
    const [icon, setIcon] = (0, react_1.useState)(null);
    if (!icon && userIcon) {
        (0, create_pointer_1.createPointer)(userIcon)
            .then(icon => {
            setIcon(icon);
        })
            .catch(icon => {
            setIcon(icon);
        });
    }
    if (!icon)
        return <></>;
    let iconPoint = (0, point_icon_1.pointIcon)(icon);
    return (<react_leaflet_1.Marker position={position} icon={iconPoint}/>);
};
exports.PointIcon = PointIcon;
