import { TExtrTypes } from "@ctypes/model";
import { shipModel } from "entities/ship";
import { UseItem } from "features/unit/use-item/ui";
import { FC } from "react";

export const ShipImproveHealth: FC = () => {

    const health = shipModel.selectors.useShipHealth()

    const _modules: TExtrTypes[] = [30,31,32]

    const details = [{
        name: 'Здоровье:',
        was: health,
        prefix: ''
    }]

    return (
        <UseItem
            item='Корабль'
            upswing='Состояние корабля'
            type="module"
            details={details}
            modules={_modules}
        />
    )
}