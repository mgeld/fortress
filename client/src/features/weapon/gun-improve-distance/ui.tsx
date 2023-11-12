import { TExtrTypes } from "@ctypes/model";
import { weaponModel } from "entities/weapon";
import { UseItem } from "features/unit/use-item/ui";
import { FC } from "react";

export const GunImproveDistance: FC = () => {

    const distance = weaponModel.selectors.useDistance()

    const _modules: TExtrTypes[] = [50, 51, 52]

    const details = [{
        name: 'Улучшение:',
        was: distance,
        prefix: 'м'
    }]


    return (
        <UseItem
            item='Пушка'
            upswing='Дальность плазм. пушки'
            type="module"
            details={details}
            modules={_modules}
        />
    )
}