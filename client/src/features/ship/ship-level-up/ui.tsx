import { shipModel } from "entities/ship";
import { ShipLevel, TShipLevel } from "entities/ship/lib/ship-level";
import { FC } from "react";
import { levelUpAPI } from "shared/api/level-up";
import { LevelUp } from "shared/ui/level-up";

export const ShipLevelUp: FC = () => {

    const level = shipModel.selectors.useShipLevel()

    const click = () => levelUpAPI('ship')

    const details = [{
        name: 'Уровень:',
        was: level,
        will: level + 1,
        prefix: ''
    }, {
        name: 'Макс. здоровье:',
        was: ShipLevel.getMaxHealth(level as TShipLevel),
        will: ShipLevel.getMaxHealth(level + 1 as TShipLevel),
        prefix: ''
    },]

    return (
        <LevelUp
            _click={click}
            item='Уровень корабля'
            upswing='Улучшения'
            level={level}
            details={details}
            price={{
                type: 'rubies',
                quantity: ShipLevel.getLevelUpPrice(level + 1 as TShipLevel)
            }}
        />
    )
}