import { FC } from "react";

import { ShipCell } from "shared/ui/ShipCell/ui";
import { IconHold } from "entities/ship/ui/assets/icons";

export const HoldPopout: FC = () => {
    return (
        <ShipCell
            head={{
                icon: <IconHold width={48} height={48} />,
                level: 2,
                name: 'Грузовой трюм',
                level_name: 'Уровень трюма'
            }}
            items={[
                {
                    name: 'Предметы',
                    counter: '87 / 100'
                },
            ]}
        />
    )
}


