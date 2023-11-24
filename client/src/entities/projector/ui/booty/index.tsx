import { FC } from "react";
import { droneMapModel } from "entities/pointer";
import { beamMapModel } from "entities/projector";
import { ItemIOS } from "./item-ios";
// import { Item } from "./item";

const Booty: FC = () => {

    const items = beamMapModel.selectors.useBooty().items

    let sizeDrone = droneMapModel.selectors.useDroneSize()

    return (
        <>
            {items.map(item => {
                return <ItemIOS
                    key={'i' + item.id}
                    item={item}
                    sizeDrone={sizeDrone}
                />
            })}
        </>
    )
}

export default Booty