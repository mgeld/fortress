import { weaponModel } from "entities/weapon";
import { GunLevel, TGunLevel } from "entities/weapon/lib/gun-level";
import { FC } from "react";
import { levelUpAPI } from "shared/api/level-up";
import { LevelUp } from "shared/ui/level-up";

export const GunLevelUp: FC = () => {

    const level = weaponModel.selectors.useLevel()

    const click = () => levelUpAPI('gun')

    const details = [{
        name: 'Уровень:',
        was: level,
        will: level + 1,
        prefix: ''
    }, {
        name: 'Снаряды:',
        was: GunLevel.getMaxShells(level as TGunLevel),
        will: GunLevel.getMaxShells(level + 1 as TGunLevel),
        prefix: ''
    }, {
        name: 'Макс. дальность:',
        was: GunLevel.getMaxDistance(level as TGunLevel),
        will: GunLevel.getMaxDistance(level + 1 as TGunLevel),
        prefix: ''
    }, {
        name: 'Макс. сила:',
        was: GunLevel.getMaxPower(level as TGunLevel),
        will: GunLevel.getMaxPower(level + 1 as TGunLevel),
        prefix: ''
    },]

    return (
        <LevelUp
            _click={click}
            item='Уровень пушки'
            upswing='Улучшение'
            level={level}
            details={details}
            price={{
                type: 'coins',
                quantity: GunLevel.getLevelUpPrice(level + 1 as TGunLevel)
            }}
        />
    )
}