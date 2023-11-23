"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBuyUnit = void 0;
const effector_1 = require("effector");
const unit_1 = require("entities/unit");
const buy_unit_1 = require("shared/api/buy-unit");
exports.onBuyUnit = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: exports.onBuyUnit,
    source: unit_1.unitModel.$unitBuySelect,
    filter: (unit) => unit !== null,
    target: (0, effector_1.createEffect)((unit) => {
        (0, buy_unit_1.buyUnitAPI)(unit);
    })
});
