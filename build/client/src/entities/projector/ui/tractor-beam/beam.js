"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beam = void 0;
const react_1 = require("react");
const react_leaflet_1 = require("react-leaflet");
const Keyframes_1 = require("shared/ui/Keyframes/Keyframes");
const pointer_1 = require("entities/pointer");
const ship_1 = require("entities/ship");
require("./styles.css");
const Beam = ({ beam }) => {
    let sizeDrone = pointer_1.droneMapModel.selectors.useDroneSize();
    sizeDrone = sizeDrone * 1.6;
    const myPos = ship_1.shipModel.selectors.useShipPos();
    const map = (0, react_leaflet_1.useMap)();
    const [invader, setInvader] = (0, react_1.useState)({
        from: map.latLngToLayerPoint(myPos),
        to: map.latLngToLayerPoint(beam.to_pos)
    });
    (0, react_1.useEffect)(() => {
        setInvader({
            from: map.latLngToLayerPoint(myPos),
            to: map.latLngToLayerPoint(beam.to_pos)
        });
    }, [myPos, beam.to_pos, map]);
    const __ = (0, react_leaflet_1.useMapEvents)({
        zoomend: () => setInvader({
            from: map.latLngToLayerPoint(myPos),
            to: map.latLngToLayerPoint(beam.to_pos)
        }),
    });
    let takeStyle = {
        animation: `beam 0.5s linear`,
    };
    const a1 = Math.pow(Math.abs(invader.from.x - invader.to.x), 2);
    const a2 = Math.pow(Math.abs(invader.from.y - invader.to.y), 2);
    const dist = Math.sqrt(a1 + a2);
    let angle = Math.atan2(invader.to.y - invader.from.y, invader.to.x - invader.from.x) * (180 / Math.PI);
    return (<>
            <Keyframes_1.Keyframes name={`beam`} _0={{
            borderRight: '0px'
        }} _100={{
            borderRight: `${dist}px solid #fafd079e`
        }}/>
            <div className="beam-block" style={{
            top: `${invader.from.y}px`,
            left: `${invader.from.x}px`,
            width: `${sizeDrone}px`,
            height: `${sizeDrone}px`,
            marginTop: `-${(sizeDrone / 2)}px`,
            marginLeft: `-${(sizeDrone / 2)}px`,
            transform: `rotate(${angle}deg)`
        }}>
                <div className="beam-box">
                    <div className='beam' style={Object.assign(Object.assign({}, takeStyle), { border: `${sizeDrone}px solid transparent`, borderRight: `${dist}px solid #f9fd0777`, marginTop: `-${(sizeDrone / 2)}px`, marginLeft: `-0px` })}/>
                </div>
            </div>
        </>);
};
exports.Beam = Beam;
