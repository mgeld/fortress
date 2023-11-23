import { fortModel } from "entities/fort";
import DefenseCounter from "entities/fort/ui/defense-counter";
import { FC } from "react";

export const FortCounter: FC = () => {

    const data = fortModel.selectors.useTakeFort().data
    const cont = fortModel.selectors.useContainerFort().data

    if(!data || cont) return <></>
    
    return (
        <DefenseCounter
            {...data}
        />
    )
}