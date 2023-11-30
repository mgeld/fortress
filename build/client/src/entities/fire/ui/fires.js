"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const fire_ios_1 = require("./fire-ios");
require("./l-styles.css");
const Fires = () => {
    const fires = __1.fireMapModel.selectors.useFire().fires;
    return (<>
            {fires.map(fire => {
            return (<fire_ios_1.FireIOS key={'q' + fire.id} fire={fire}/>);
        })}
        </>);
};
exports.default = Fires;
