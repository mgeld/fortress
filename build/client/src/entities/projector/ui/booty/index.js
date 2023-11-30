"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projector_1 = require("entities/projector");
const item_ios_1 = require("./item-ios");
const Booty = () => {
    const items = projector_1.beamMapModel.selectors.useBooty().items;
    return (<>
            {items.map(item => {
            return <item_ios_1.ItemIOS key={'i' + item.id} item={item}/>;
        })}
        </>);
};
exports.default = Booty;
