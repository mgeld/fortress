"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const take_1 = require("./take");
const pointer_1 = require("entities/pointer");
const Invaders = () => {
    const takes = __1.invaderMapModel.selectors.useInvader().takes;
    let sizeDrone = pointer_1.droneMapModel.selectors.useDroneSize();
    let sizeInvader = sizeDrone / 2;
    return (<>
            {takes.map(take => {
            return <take_1.Take key={'q' + take.id} take={take} sizeInvader={sizeInvader} sizeDrone={sizeDrone}/>;
        })}
        </>);
};
exports.default = Invaders;
