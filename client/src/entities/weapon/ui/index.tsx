import { FC } from "react";

import { ShipCell } from "shared/ui/ship-cell/ui";
// import { IconGun } from "entities/ship/ui/assets/icons";
import { weaponModel } from "..";
import { popoutModel } from "shared/ui/popout-root";
import { GunLevel, TGunLevel } from "../lib/gun-level";
import { IconShipGun } from "shared/assets/icons/_icons";
import { shipModel } from "entities/ship";
import { alertModel } from "shared/ui/alert";

export const GunPopout: FC = () => {

    const shipLevel = shipModel.selectors.useShipLevel()

    const gunLevel = weaponModel.selectors.useLevel()
    const bullets = weaponModel.selectors.useBullets()
    const distance = weaponModel.selectors.useDistance()
    const power = weaponModel.selectors.usePower()

    return (
        <ShipCell
            head={{
                icon: <IconShipGun width={54} height={54} />,
                level: gunLevel,
                name: 'Обычная пушка',
                level_name: 'Уровень пушки',
                up: GunLevel.isUpLevel(gunLevel, shipLevel) ? {
                    _click: () => popoutModel.events.setPopout('gun-level-up')
                } : {
                    _click: () => {
                        popoutModel.events.setPopout('alert')
                        alertModel.events.setAlert({
                            alert: 'Уровень Пушки',
                            message: 'У вас максимальный уровень Пушки на текущий уровень корабля. Для улучшения пушки, сначала неободимо повысить уровень корабля.',
                            action: {
                                close: false,
                                text: 'Закрыть',
                                _click: () => popoutModel.events.setPopout(null)
                            }
                        })
                    }
                }
            }}
            items={[
                // {
                //     name: 'Снаряды',
                //     counter: `${bullets} / ${GunLevel.getMaxShells(level as TGunLevel)}`
                // },
                {
                    name: 'Дальность удара',
                    counter: `${distance} / ${GunLevel.getMaxDistance(gunLevel as TGunLevel)}`,
                    _click: () => popoutModel.events.setPopout('gun-improve-distance')
                },
                {
                    name: 'Мощность удара',
                    counter: `${power} / ${GunLevel.getMaxPower(gunLevel as TGunLevel)}`,
                    _click: () => popoutModel.events.setPopout('gun-improve-power')
                },
            ]}
        />
    )

}


