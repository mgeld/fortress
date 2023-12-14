"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitadelMap = void 0;
const citadel_1 = require("entities/citadel");
const citadel_2 = require("entities/citadel");
const pointer_1 = require("entities/pointer");
const alert_1 = require("shared/ui/alert");
const popout_root_1 = require("shared/ui/popout-root");
const CitadelMap = () => {
    var _a;
    const pos = ((_a = citadel_1.citadelModel.selectors.useCitadel()) === null || _a === void 0 ? void 0 : _a.latlng) || [0, 0];
    const size = pointer_1.droneMapModel.selectors.useDroneSize().px;
    const eventCitadel = () => {
        popout_root_1.popoutModel.events.setPopout('alert');
        alert_1.alertModel.events.setAlert({
            alert: 'Цитадель',
            message: 'Цитадель - это центр вашей зоны и первый захваченный форт. Куда бы вы не полетели, вы всегда сможете телепортироваться обратно к Цитадели.',
            action: {
                close: false,
                text: 'Принято',
                _click: () => popout_root_1.popoutModel.events.setPopout(null)
            }
        });
    };
    return (<citadel_2.Citadel pos={pos} _click={eventCitadel} droneSize={size}/>);
};
exports.CitadelMap = CitadelMap;
