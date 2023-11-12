"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const bomb_1 = require("./bomb");
const Bombs = () => {
    const bombs = __1.bombMapModel.selectors.useBomb().bombs;
    return (<>
            {bombs.map(bomb => {
            return (<bomb_1.Bomb key={'q' + bomb.id} bomb={bomb}/>);
        })}
        </>);
};
exports.default = Bombs;
