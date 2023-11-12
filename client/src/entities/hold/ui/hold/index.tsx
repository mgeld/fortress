import { FC } from "react";

import { ShipCell } from "shared/ui/ship-cell/ui";
import { IconHold } from "entities/ship/ui/assets/icons";
import { popoutModel } from "shared/ui/popout-root";
import { holdModel } from "entities/hold";
import { HoldLevel, THoldLevel } from "entities/hold/lib/hold-level";
import { pageModel } from "shared/ui/page-root";

export const HoldPopout: FC = () => {

    const lengthItems = holdModel.selectors.useHoldItems().length

    const level = holdModel.selectors.useHoldLevel()

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
            items={[
                {
                    name: 'Предметы',
                    counter: `${lengthItems} / ${HoldLevel.getMaxItems(level as THoldLevel)}`,
                    _click: () => {
                        popoutModel.events.setPopout(null)
                        pageModel.events.setPage('gun-shop')
                    }
                },
            ]}
        />
    )
}


