"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttackFort = void 0;
const react_leaflet_1 = require("react-leaflet");
const fort_1 = require("entities/fort");
require("./styles.css");
const randomNumber_1 = require("shared/lib/randomNumber");
const AttackFort = ({ pos }) => {
    const data = fort_1.fortModel.selectors.useTakeFort().data;
    if (!data || (data === null || data === void 0 ? void 0 : data.status) === 'defense' || data.fort[0] !== pos[0])
        return <></>;
    const fill = (data === null || data === void 0 ? void 0 : data.status) === 'victory' ? 'green' : 'red';
    return (<react_leaflet_1.Circle key={(0, randomNumber_1.randomNumber)(0, 100)} className={`attack-fort`} center={[
            pos[0] - 0.00005,
            pos[1] - 0.00002
        ]} pathOptions={{
            fillColor: fill,
            fillOpacity: 0.4,
            stroke: false,
        }} radius={30}/>);
};
exports.AttackFort = AttackFort;
