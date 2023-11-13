import { shipModel } from "entities/ship";
import { stormModel } from "entities/storm-corps";
import { StormCorpsLevel, TStormCorpsLevel } from "entities/storm-corps/lib/storm-corps-level";
import { FC } from "react";
import { levelUpAPI } from "shared/api/level-up";
import { LevelUp } from "shared/ui/level-up";

export const StormLevelUp: FC = () => {

    const level = stormModel.selectors.useStormLevel()

    const click = () => levelUpAPI('storm-corps')

    const details = [{
        name: 'Уровень:',
        was: level,
        will: level + 1,
        prefix: ''
    }, {
        name: 'Макс. сила штурма:',
        was: StormCorpsLevel.getMaxpower(level as TStormCorpsLevel),
        will: StormCorpsLevel.getMaxpower(level + 1 as TStormCorpsLevel),
        prefix: ''
    }, {
        name: 'Макс. вместимость:',
        was: StormCorpsLevel.getMaxInvaders(level as TStormCorpsLevel),
        will: StormCorpsLevel.getMaxInvaders(level + 1 as TStormCorpsLevel),
        prefix: ''
    },]

    return (
        <LevelUp
            _click={click}
            item='Уровень Ш. Корпуса'
            upswing='Улучшение'
            level={level}
            details={details}
            price={{
                type: 'coins',
                quantity: StormCorpsLevel.getLevelUpPrice(level + 1 as TStormCorpsLevel)
            }}
        />
    )
}