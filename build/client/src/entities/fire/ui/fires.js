"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const fire_1 = require("./fire");
require("./l-styles.css");
const Fires = () => {
    const fires = __1.fireMapModel.selectors.useFire().fires;
    return (<>
            {fires.map(fire => {
            console.log(`'q' + fire.id`, 'q' + fire.id);
            return (<fire_1.Fire key={'q' + fire.id} fire={fire}/>);
        })}
        </>);
};
exports.default = Fires;
