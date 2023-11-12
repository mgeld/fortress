import { TExtrTypes } from "@ctypes/model";
import { stormModel } from "entities/storm-corps";
import { UseItem } from "features/unit/use-item/ui";
import { FC } from "react";

export const StormImprovePower: FC = () => {

    const power = stormModel.selectors.useStormPower()

    const _modules: TExtrTypes[] = [20,21,22]

    const details = [{
        name: 'Сила:',
        was: power,
        prefix: ''
    }]

    return (
        <UseItem
            item='Штурмовики'
            upswing='Сила штурма'
            type="module"
            details={details}
            modules={_modules}
        />
    )
}