"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPoint = void 0;
const health_1 = __importDefault(require("entities/pointer/ui/health"));
const point_icon_1 = require("entities/pointer/ui/point-icon");
const ship_1 = require("entities/ship");
const user_1 = require("entities/user");
const ui_1 = __importDefault(require("features/ship/recover-drone-button/ui"));
const UserPoint = () => {
    const { userIcon, userName } = user_1.userModel.selectors.useUser();
    const pos = ship_1.shipModel.selectors.useShipPos();
    const health = ship_1.shipModel.selectors.useShipHealth();
    const lvl = ship_1.shipModel.selectors.useShipLevel();
    return (<>
            {health > 0 ? (<health_1.default lvl={lvl} position={pos} health={health}/>) : (<ui_1.default position={pos}/>)}
            <point_icon_1.PointIcon position={pos} userIcon={userIcon || ''} userName={userName || ''}/>
        </>);
};
exports.UserPoint = UserPoint;
