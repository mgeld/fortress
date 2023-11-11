import { Fort } from "entities/fort";
import { shipModel } from "entities/ship";
import { FC } from "react";

export const FortMap: FC = () => {
    const pos = shipModel.selectors.useShipPos()
    return (
        <Fort pos={pos} />
    )
}