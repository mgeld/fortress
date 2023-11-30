import { FC } from "react";
import { beamMapModel } from "entities/projector";
import { ItemIOS } from "./item-ios";

const Booty: FC = () => {

    const items = beamMapModel.selectors.useBooty().items

    return (
        <>
            {items.map(item => {
                return <ItemIOS
                    key={'i' + item.id}
                    item={item}
                />
            })}
        </>
    )
}

export default Booty