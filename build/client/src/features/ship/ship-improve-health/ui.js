"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipImproveHealth = void 0;
const ship_1 = require("entities/ship");
const ui_1 = require("features/unit/use-item/ui");
const ShipImproveHealth = () => {
    const health = ship_1.shipModel.selectors.useShipHealth();
    const _modules = [30, 31, 32];
    const details = [{
            name: 'Здоровье:',
            was: health,
            prefix: ''
        }];
    return (<ui_1.UseItem item='Корабль' upswing='Состояние корабля' type="module" details={details} modules={_modules}/>);
};
exports.ShipImproveHealth = ShipImproveHealth;
