import { holdModel } from "entities/hold";
import { HoldLevel, THoldLevel } from "entities/hold/lib/hold-level";
import { ShipLevel, TShipLevel } from "entities/ship/lib/ship-level";
import { FC } from "react";
import { levelUpAPI } from "shared/api/level-up";
import { LevelUp } from "shared/ui/level-up";

export const HoldLevelUp: FC = () => {

    const level = holdModel.selectors.useHoldLevel()

    const click = () => levelUpAPI('hold')

    const details = [{
        name: 'Уровень:',
        was: level,
        will: level + 1,
        prefix: ''
    }, {
        name: 'Вместимость:',
        was: HoldLevel.getMaxItems(level as THoldLevel),
        will: HoldLevel.getMaxItems(level + 1 as THoldLevel),
        prefix: ''
    },]

    return (
        <LevelUp
            _click={click}
            item='Уровень трюма'
            upswing='Улучшение'
            level={level}
            details={details}
            price={{
                type: 'coins',
                quantity: HoldLevel.getLevelUpPrice(level + 1 as TShipLevel)
            }}
        />
    )
}