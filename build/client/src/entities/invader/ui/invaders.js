"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const pointer_1 = require("entities/pointer");
const take_ios_1 = require("./take-ios");
const Invaders = () => {
    const takes = __1.invaderMapModel.selectors.useInvader().takes;
    let sizeDrone = pointer_1.droneMapModel.selectors.useDroneSize();
    let sizeInvader = sizeDrone / 2;
    return (<>
            {takes.map(take => {
            return <take_ios_1.TakeIOS key={'q' + take.id} take={take} sizeInvader={sizeInvader} sizeDrone={sizeDrone}/>;
        })}
        </>);
};
exports.default = Invaders;
