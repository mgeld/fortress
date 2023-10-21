import { fortModel } from "entities/fort";
import DefenseCounter from "entities/fort/ui/defense-counter";
import { FC } from "react";

export const FortCounter: FC = () => {

    const data = fortModel.selectors.useTakeFort().data

    if(!data) return <></>
    // else return <></>
    
    return (
        <DefenseCounter
            {...data}
        />
    )
}