import { FC } from "react";

import { stormModel } from "..";
import { shipModel } from "entities/ship";
import { alertModel } from "shared/ui/alert";
import { ShipCell } from "shared/ui/ship-cell/ui";
import { popoutModel } from "shared/ui/popout-root";
import { IconStorm } from "entities/ship/ui/assets/icons";
import { StormCorpsLevel, TStormCorpsLevel } from "../lib/storm-corps-level";

export const StormCorpsPopout: FC = () => {

    const shipLevel = shipModel.selectors.useShipLevel()

    const invaders = stormModel.selectors.useStormInvaders()
    const power = stormModel.selectors.useStormPower()
    const stormLevel = stormModel.selectors.useStormLevel()

    return (
        <ShipCell
            head={{
                icon: <IconStorm width={54} height={54} />,
                level: stormLevel,
                name: 'Штурмовой корпус',
                level_name: 'Уровень ШК',
                up: StormCorpsLevel.isUpLevel(stormLevel, shipLevel) ? {
                    _click: () => popoutModel.events.setPopout('storm-level-up')
                } : {
                    _click: () => {
                        popoutModel.events.setPopout('alert')
                        alertModel.events.setAlert({
                            alert: 'Уровень Ш. Корпуса',
                            message: 'У вас максимальный уровень Штурмового Корпуса на текущий уровень корабля. Для улучшения корпуса, сначала неободимо повысить уровень корабля.',
                            action: {
                                close: false,
                                text: 'Закрыть',
                                _click: () => popoutModel.events.setPopout("storm-corps")
                            }
                        })
                    }
                }
            }}
            items={[
                {
                    name: 'Штурмовики',
                    counter: `${invaders} / ${StormCorpsLevel.getMaxInvaders(stormLevel as TStormCorpsLevel)}`,
                    _click: () => popoutModel.events.setPopout('storm-add-invaders')
                },
                {
                    name: 'Сила штурмовиков',
                    counter: `${power} / ${StormCorpsLevel.getMaxpower(stormLevel as TStormCorpsLevel)}`,
                    _click: () => popoutModel.events.setPopout('storm-improve-power')
                },
            ]}
        />
    )

}


