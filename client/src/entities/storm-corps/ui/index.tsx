import { FC } from "react";

import { ShipCell } from "shared/ui/ShipCell/ui";
import { IconStorm } from "entities/ship/ui/assets/icons";

export const StormCorpsPopout: FC = () => {

    return (
        <ShipCell
            head={{
                icon: <IconStorm width={54} height={54} />,
                level: 2,
                name: 'Штурмовой корпус',
                level_name: 'Уровень ШК'
            }}
            items={[
                {
                    name: 'Штурмовики',
                    counter: '87 / 100'
                },
                {
                    name: 'Сила штурмовиков',
                    counter: '87 / 100',
                },
            ]}
        />
    )

}


