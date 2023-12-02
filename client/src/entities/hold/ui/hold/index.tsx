import { FC } from "react";

import { holdModel } from "entities/hold";
import { pageModel } from "shared/ui/page-root";
import { ShipCell } from "shared/ui/ship-cell/ui";
import { popoutModel } from "shared/ui/popout-root";
import { IconHold } from "entities/ship/ui/assets/icons";
import { HoldLevel, THoldLevel } from "entities/hold/lib/hold-level";
import { shipModel } from "entities/ship";
import { alertModel } from "shared/ui/alert";

export const HoldPopout: FC = () => {

    const shipLevel = shipModel.selectors.useShipLevel()

    const levelHold = holdModel.selectors.useHoldLevel()
    const lengthItems = holdModel.selectors.useHoldItems().length

    return (
        <ShipCell
            head={{
                icon: <IconHold width={48} height={48} />,
                level: levelHold,
                name: 'Грузовой трюм',
                level_name: 'Уровень трюма',
                up: HoldLevel.isUpLevel(levelHold, shipLevel) ? {
                    _click: () => popoutModel.events.setPopout('hold-level-up')
                } : {
                    _click: () => {
                        popoutModel.events.setPopout('alert')
                        alertModel.events.setAlert({
                            alert: 'Уровень трюма',
                            message: 'У вас максимальный уровень трюма на текущий уровень корабля. Для улучшения трюма, сначала неободимо повысить уровень корабля.',
                            action: {
                                close: false,
                                text: 'Закрыть',
                                _click: () => popoutModel.events.setPopout(null)
                            }
                        })
                    }
                }
            }}
            items={[{
                name: 'Предметы',
                counter: `${lengthItems} / ${HoldLevel.getMaxItems(levelHold as THoldLevel)}`,
                _click: () => {
                    popoutModel.events.setPopout(null)
                    pageModel.events.setPage('gun-shop')
                }
            }]}
        />
    )
}


