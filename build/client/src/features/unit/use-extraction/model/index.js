"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUseExtraction = void 0;
const effector_1 = require("effector");
const hold_1 = require("entities/hold");
const use_extraction_1 = require("shared/api/use-extraction");
exports.onUseExtraction = (0, effector_1.createEvent)();
(0, effector_1.sample)({
    clock: exports.onUseExtraction,
    source: hold_1.holdModel.$extractionSelect,
    filter: (extr) => extr !== null,
    target: (0, effector_1.createEffect)((extr) => {
        (0, use_extraction_1.useExtractionAPI)(extr.id, extr.index);
    })
});
