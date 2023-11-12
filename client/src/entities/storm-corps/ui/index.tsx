import { FC } from "react";

import { ShipCell } from "shared/ui/ship-cell/ui";
import { IconStorm } from "entities/ship/ui/assets/icons";
import { popoutModel } from "shared/ui/popout-root";
import { StormCorpsLevel, TStormCorpsLevel } from "../lib/storm-corps-level";
import { stormModel } from "..";

export const StormCorpsPopout: FC = () => {

    const invaders = stormModel.selectors.useStormInvaders()
    const power = stormModel.selectors.useStormPower()
    const level = stormModel.selectors.useStormLevel()

    return (
        <ShipCell
            head={{
                icon: <IconStorm width={54} height={54} />,
                level: level,
                name: 'Штурмовой корпус',
                level_name: 'Уровень ШК',
                up: StormCorpsLevel.isUpLevel(level) ? {
                    _click: () => popoutModel.events.setPopout('storm-level-up')
                } : null
            }}
            items={[
                {
                    name: 'Штурмовики',
                    counter: `${invaders} / ${StormCorpsLevel.getMaxInvaders(level as TStormCorpsLevel)}`,
                    _click: () => popoutModel.events.setPopout('storm-add-invaders')
                },
                {
                    name: 'Сила штурмовиков',
                    counter: `${power} / ${StormCorpsLevel.getMaxpower(level as TStormCorpsLevel)}`,
                    _click: () => popoutModel.events.setPopout('storm-improve-power')
                },
            ]}
        />
    )

}


