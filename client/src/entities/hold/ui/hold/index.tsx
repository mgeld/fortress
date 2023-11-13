import { FC } from "react";

import { holdModel } from "entities/hold";
import { pageModel } from "shared/ui/page-root";
import { ShipCell } from "shared/ui/ship-cell/ui";
import { popoutModel } from "shared/ui/popout-root";
import { IconHold } from "entities/ship/ui/assets/icons";
import { HoldLevel, THoldLevel } from "entities/hold/lib/hold-level";

export const HoldPopout: FC = () => {

    const level = holdModel.selectors.useHoldLevel()
    const lengthItems = holdModel.selectors.useHoldItems().length

    return (
        <ShipCell
            head={{
                icon: <IconHold width={48} height={48} />,
                level,
                name: 'Грузовой трюм',
                level_name: 'Уровень трюма',
                up: HoldLevel.isUpLevel(level) ? {
                    _click: () => popoutModel.events.setPopout('hold-level-up')
                } : null
            }}
            items={[{
                name: 'Предметы',
                counter: `${lengthItems} / ${HoldLevel.getMaxItems(level as THoldLevel)}`,
                _click: () => {
                    popoutModel.events.setPopout(null)
                    pageModel.events.setPage('gun-shop')
                }
            }]}
        />
    )
}


