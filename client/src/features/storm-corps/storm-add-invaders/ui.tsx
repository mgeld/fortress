import { FC } from "react";
import { TExtrTypes } from "@ctypes/model";
import { stormModel } from "entities/storm-corps";
import { UseItem } from "features/unit/use-item/ui";

export const StormAddInvaders: FC = () => {

    const invaders = stormModel.selectors.useStormInvaders()

    const _modules: TExtrTypes[] = [100,101]

    const details = [{
        name: 'Количество:',
        was: invaders,
        prefix: 'ш'
    }]

    return (
        <UseItem
            item='Штурмовой корпус'
            upswing='Штурмовики'
            type="item"
            details={details}
            modules={_modules}
        />
    )
}