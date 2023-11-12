"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TractorBeam = void 0;
const beam_1 = require("./beam");
const projector_1 = require("entities/projector");
const TractorBeam = () => {
    const beam = projector_1.beamMapModel.selectors.useBeam().beam;
    if (!beam)
        return <></>;
    return <beam_1.Beam beam={beam}/>;
};
exports.TractorBeam = TractorBeam;
