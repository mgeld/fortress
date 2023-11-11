import { FC } from "react";

import { ShipCell } from "shared/ui/ship-cell/ui";
import { IconGun } from "entities/ship/ui/assets/icons";
import { weaponModel } from "..";
import { popoutModel } from "shared/ui/popout-root";
import { GunLevel, TGunLevel } from "../lib/gun-level";

export const GunPopout: FC = () => {

    const level = weaponModel.selectors.useLevel()
    const bullets = weaponModel.selectors.useBullets()
    const distance = weaponModel.selectors.useDistance()
    const power = weaponModel.selectors.usePower()

    return (
        <ShipCell
            head={{
                icon: <IconGun width={54} height={54} />,
                level,
                name: 'Обычная пушка',
                level_name: 'Уровень пушки',
                _click: () => {
                    popoutModel.events.setPopout('gun-level-up')
                }
            }}
            items={[
                {
                    name: 'Снаряды',
                    counter: `${bullets} / ${GunLevel.getMaxShells(level as TGunLevel)}`
                },
                {
                    name: 'Дальность удара',
                    counter: `${distance} / ${GunLevel.getMaxDistance(level as TGunLevel)}`,
                    _click: () => popoutModel.events.setPopout('gun-improve-distance')
                },
                {
                    name: 'Мощность удара',
                    counter: `${power} / ${GunLevel.getMaxPower(level as TGunLevel)}`,
                    _click: () => popoutModel.events.setPopout('gun-improve-power')
                },
            ]}
        />
    )

}


