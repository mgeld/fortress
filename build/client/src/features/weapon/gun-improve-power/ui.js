"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunImprovePower = void 0;
const weapon_1 = require("entities/weapon");
const ui_1 = require("features/unit/use-item/ui");
const GunImprovePower = () => {
    const power = weapon_1.weaponModel.selectors.usePower();
    const _modules = [50, 51, 52];
    const details = [{
            name: 'Улучшение:',
            was: power,
        }];
    return (<ui_1.UseItem item='Пушка' upswing='Сила плазм. пушки' type="module" details={details} modules={_modules}/>);
};
exports.GunImprovePower = GunImprovePower;
