import { fortModel } from "entities/fort";
import DetailsPopup from "entities/fort/ui/details-popup";
import { FC } from "react";

export const FortDetailsMap: FC = () => {
    const fort = fortModel.selectors.useFort().data

    if (!fort) return <></>

    return (
        <DetailsPopup fort={fort} />
    )
}