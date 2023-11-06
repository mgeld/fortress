import { TExtrTypes } from "@ctypes/model";
import { weaponModel } from "entities/weapon";
import { FC } from "react";
import { UseItemPopout } from "widgets/use-item/ui";

export const GunImprovePower: FC = () => {

    const power = weaponModel.selectors.useWeapon().usedWeapon?.power || 0

    const _modules: TExtrTypes[] = [50, 51, 52]

    const items = [{
        name: 'Улучшение:',
        was: power,
        // prefix: ''
    }]

    return (
        <UseItemPopout
            item='Пушка'
            upswing='Сила плазм. пушки'
            items={items}
            modules={_modules}
        />
    )
}