import { fortModel } from "entities/fort";
import BootyPopup from "entities/fort/ui/booty-popup";
import { FC } from "react";

export const BootyMap: FC = () => {

    const data = fortModel.selectors.useContainerFort().data

    if(!data) return <></>
    
    return (
        <BootyPopup
            cont={data.cont}
            fort={data.fort}
        />
    )
}