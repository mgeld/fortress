import { TExtrTypes } from "@ctypes/model";
import { weaponModel } from "entities/weapon";
import { UseItem } from "features/unit/use-item/ui";
import { FC } from "react";

export const GunImprovePower: FC = () => {

    const power = weaponModel.selectors.usePower()

    const _modules: TExtrTypes[] = [50, 51, 52]

    const details = [{
        name: 'Улучшение:',
        was: power,
        // prefix: ''
    }]

    return (
        <UseItem
            item='Пушка'
            upswing='Сила плазм. пушки'
            type="module"
            details={details}
            modules={_modules}
        />
    )
}