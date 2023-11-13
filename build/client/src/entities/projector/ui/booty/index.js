"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointer_1 = require("entities/pointer");
const projector_1 = require("entities/projector");
const item_1 = require("./item");
const Booty = () => {
    const items = projector_1.beamMapModel.selectors.useBooty().items;
    console.log('Booty items', items);
    let sizeDrone = pointer_1.droneMapModel.selectors.useDroneSize();
    return (<>
            {items.map(item => {
            return <item_1.Item key={'i' + item.id} item={item} sizeDrone={sizeDrone}/>;
        })}
        </>);
};
exports.default = Booty;
