import { FC } from "react";
import { Beam } from "./beam";
import { beamMapModel } from "entities/projector";

export const TractorBeam: FC = () => {
    const beam = beamMapModel.selectors.useBeam().beam
    if (!beam) return <></>
    return <Beam beam={beam} />
}