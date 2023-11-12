"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormAddInvaders = void 0;
const storm_corps_1 = require("entities/storm-corps");
const ui_1 = require("features/unit/use-item/ui");
const StormAddInvaders = () => {
    const invaders = storm_corps_1.stormModel.selectors.useStormInvaders();
    const _modules = [100, 101];
    const details = [{
            name: 'Количество:',
            was: invaders,
            prefix: 'ш'
        }];
    return (<ui_1.UseItem item='Штурмовой корпус' upswing='Штурмовики' type="item" details={details} modules={_modules}/>);
};
exports.StormAddInvaders = StormAddInvaders;
