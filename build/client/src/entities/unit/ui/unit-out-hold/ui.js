"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOutHold = void 0;
const unit_1 = require("entities/unit");
const modules_1 = require("entities/unit/lib/modules");
const alert_1 = require("shared/ui/alert");
const popout_root_1 = require("shared/ui/popout-root");
const UnitOutHold = () => {
    const unit = unit_1.unitModel.selectors.useUnit();
    if (!unit)
        return <></>;
    return (<alert_1.Alert alert={modules_1.modules[unit].name} message={`В трюме нет нужного предмета для использования. Перейти к покупке?`} action={{
            text: 'Подтвердить',
            _click: () => {
                popout_root_1.popoutModel.events.setPopout('select-unit');
            }
        }}/>);
};
exports.UnitOutHold = UnitOutHold;
