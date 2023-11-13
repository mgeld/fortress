"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormImprovePower = void 0;
const storm_corps_1 = require("entities/storm-corps");
const ui_1 = require("features/unit/use-item/ui");
const StormImprovePower = () => {
    const power = storm_corps_1.stormModel.selectors.useStormPower();
    const _modules = [20, 21, 22];
    const details = [{
            name: 'Сила:',
            was: power,
            prefix: ''
        }];
    return (<ui_1.UseItem item='Штурмовики' upswing='Сила штурма' type="module" details={details} modules={_modules}/>);
};
exports.StormImprovePower = StormImprovePower;
