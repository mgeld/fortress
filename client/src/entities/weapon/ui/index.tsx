import { FC } from "react";

import { ShipCell } from "shared/ui/ShipCell/ui";
import { IconGun } from "entities/ship/ui/assets/icons";
import { weaponModel } from "..";
import { popoutModel } from "shared/ui/PopoutRoot";

export const GunPopout: FC = () => {

    const gun = weaponModel.selectors.useWeapon().weapons[0]

    return (
        <ShipCell
            head={{
                icon: <IconGun width={54} height={54} />,
                level: 2,
                name: 'Обычная пушка',
                level_name: 'Уровень пушки'
            }}
            items={[
                {
                    name: 'Снаряды',
                    counter: '54 / 150'
                },
                {
                    name: 'Дальность удара',
                    counter: `${gun.distance} / 200`,
                    _click: () => popoutModel.events.setPopout('gun-improve-distance')
                },
                {
                    name: 'Мощность удара',
                    counter: `${gun.power} / 30`,
                    _click: () => popoutModel.events.setPopout('gun-improve-power')
                },
            ]}
        />
    )

}


