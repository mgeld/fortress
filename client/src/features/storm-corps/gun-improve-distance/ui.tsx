import { TExtrTypes } from "@ctypes/model";
import { weaponModel } from "entities/weapon";
import { FC } from "react";
import { UseItemPopout } from "widgets/use-item/ui";

export const GunImproveDistance: FC = () => {

    const distance = weaponModel.selectors.useWeapon().usedWeapon?.distance || 0

    const _modules: TExtrTypes[] = [50, 51, 52]

    const items = [{
        name: 'Улучшение:',
        was: distance,
        prefix: 'м'
    }]

    return (
        <UseItemPopout
            item='Пушка'
            upswing='Дальность плазм. пушки'
            items={items}
            modules={_modules}
        />
    )
}