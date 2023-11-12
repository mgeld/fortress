"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GunImproveDistance = void 0;
const weapon_1 = require("entities/weapon");
const ui_1 = require("features/unit/use-item/ui");
const GunImproveDistance = () => {
    const distance = weapon_1.weaponModel.selectors.useDistance();
    const _modules = [50, 51, 52];
    const details = [{
            name: 'Улучшение:',
            was: distance,
            prefix: 'м'
        }];
    return (<ui_1.UseItem item='Пушка' upswing='Дальность плазм. пушки' type="module" details={details} modules={_modules}/>);
};
exports.GunImproveDistance = GunImproveDistance;
