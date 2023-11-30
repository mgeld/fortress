"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireIOS = void 0;
const react_leaflet_1 = require("react-leaflet");
const Keyframes_1 = require("shared/ui/Keyframes/Keyframes");
const pointer_1 = require("entities/pointer");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const cutLength = (a, b) => Math.sqrt((b.y - a.y) ** 2 + (b.x - a.x) ** 2);
const FireIOS = ({ fire }) => {
    console.log('FireIOS FireIOS FireIOSFireIOS');
    let size = pointer_1.droneMapModel.selectors.useDroneSize();
    let sizeFire = size.px * 0.6;
    const map = (0, react_leaflet_1.useMap)();
    const coords = map.latLngToContainerPoint(fire.from_pos);
    let fireStyle = {
        top: coords.y - sizeFire / 2,
        left: coords.x - sizeFire / 2
    };
    let posImpact = (fire === null || fire === void 0 ? void 0 : fire.hit_pos) || fire.to_pos;
    const dist = cutLength({
        x: fire.to_pos[1],
        y: fire.to_pos[0],
    }, {
        x: fire.from_pos[1],
        y: fire.from_pos[0],
    });
    const collision = cutLength({
        x: posImpact[1],
        y: posImpact[0],
    }, {
        x: fire.from_pos[1],
        y: fire.from_pos[0],
    });
    const speed = 5 * ((collision / dist * 100) / 100);
    const a1 = map.project(posImpact).x - map.project(fire.from_pos).x;
    const a2 = map.project(posImpact).y - map.project(fire.from_pos).y;
    fireStyle['transform'] = `translate3d(${a1}px, ${a2}px, 0px)`;
    fireStyle.animation = `fire_${fire.id} ${Math.floor(speed) / 10}s alternate`;
    return (<>
            <div key={fire.id}>
                <Keyframes_1.Keyframes name={`fire_${fire.id}`} from={{
            transform: 'translate3d(0px, 0px, 0px)',
        }} to={{
            transform: fireStyle['transform'],
        }}/>
                <div className={`${styles_module_scss_1.default.__fire}`} style={Object.assign(Object.assign({}, fireStyle), { width: `${sizeFire}px`, height: `${sizeFire}px` })}/>
            </div>
        </>);
};
exports.FireIOS = FireIOS;
