"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const take_ios_1 = require("./take-ios");
const Invaders = () => {
    const takes = __1.invaderMapModel.selectors.useInvader().takes;
    return (<>
            {takes.map(take => {
            return <take_ios_1.TakeIOS key={'q' + take.id} take={take}/>;
        })}
        </>);
};
exports.default = Invaders;
