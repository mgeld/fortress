import { ArealBorder } from "entities/areal/ui";
import { shipModel } from "entities/ship";
import { FC } from "react";

export const ArealRectangle: FC = () => {
    const areal = shipModel.selectors.useAreal()

    if (!areal) return null

    return (
        <ArealBorder areal={areal} />
    )
}