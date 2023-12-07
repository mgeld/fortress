"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemIOS = void 0;
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const leaflet_1 = require("leaflet");
const randomNumber_1 = require("shared/lib/randomNumber");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const getDestination_1 = require("entities/sector/lib/getDestination");
const cont_1_svg_1 = __importDefault(require("shared/assets/icons/cont_1.svg"));
const cont_2_svg_1 = __importDefault(require("shared/assets/icons/cont_2.svg"));
const cont_3_svg_1 = __importDefault(require("shared/assets/icons/cont_3.svg"));
const ItemIOS = ({ item }) => {
    const sizeDrone = 30;
    const toPosLatLng = (0, getDestination_1.getDestination)(item.from_pos[0], item.from_pos[1], sizeDrone / 2, 90);
    const aa = Math.round((toPosLatLng[1] - item.from_pos[1]) * 100000);
    const [pos, setBootyPos] = (0, react_1.useState)([
        item.from_pos[0] + ((0, randomNumber_1.randomNumber)(-(aa), aa) / 100000),
        item.from_pos[1] + ((0, randomNumber_1.randomNumber)(-(aa), aa) / 100000)
    ]);
    (0, react_1.useEffect)(() => {
        setTimeout(() => setBootyPos(item.to_pos), 200);
    }, [item.to_pos]);
    const bounds = (0, leaflet_1.latLng)(pos[0], pos[1]).toBounds(30);
    return (<react_leaflet_1.ImageOverlay className={`${styles_module_scss_1.default.__booty} ${item.id}`} url={item.unit === 1 ? cont_1_svg_1.default :
            item.unit === 2 ? cont_2_svg_1.default :
                item.unit === 3 ? cont_3_svg_1.default :
                    "icons/invader.svg"} bounds={bounds}/>);
};
exports.ItemIOS = ItemIOS;
