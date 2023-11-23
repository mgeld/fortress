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
const FireIOS = ({ fire }) => {
    let sizeFire = pointer_1.droneMapModel.selectors.useDroneSize() / 2.5;
    const map = (0, react_leaflet_1.useMap)();
    const coords = map.latLngToContainerPoint(fire.from_pos);
    let fireStyle = {
        top: coords.y - sizeFire / 2,
        left: coords.x - sizeFire / 2
    };
    let time_fire = 0;
    let posImpact = (fire === null || fire === void 0 ? void 0 : fire.hit_pos) || fire.to_pos;
    if (fire.direction === 'BACKWARD' || fire.direction === 'FORWARD') {
        time_fire = Math.floor((posImpact[0] - fire.from_pos[0]) * 1000);
        let px_to_pos = map.project(posImpact).y - map.project(fire.from_pos).y;
        fireStyle['transform'] = `translate3d(0px, ${px_to_pos}px, 0px)`;
    }
    else {
        time_fire = Math.floor((posImpact[1] - fire.from_pos[1]) * 1000);
        let px_to_pos = map.project(posImpact).x - map.project(fire.from_pos).x;
        fireStyle['transform'] = `translate3d(${px_to_pos}px, 0px, 0px)`;
    }
    fireStyle.animation = `fire_${fire.id} ${Math.abs(time_fire) / 10}s alternate`;
    console.log('Math.abs(time_fire) / 10', Math.abs(time_fire) / 10);
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
