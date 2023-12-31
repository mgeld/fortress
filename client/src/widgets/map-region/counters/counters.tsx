import { Counter } from "shared/ui/counter"

import {
    IconExperience,
    IconSector,
    IconTrophy,
    IconZone
} from "./icons/_icons"

import { useEffect, useRef, useState } from "react"

import { CounterProgress } from "shared/ui/counter-progress"

import { zoneModel } from "entities/zone"
import { userModel } from "entities/user"
import { Tooltip } from "shared/ui/tooltip/ui"

import { TZoneLevel, ZoneLevel } from "entities/zone/lib/zone-level"

import styles from './styles.module.scss'
import { Ranks, TRank } from "entities/user/lib/ranks"
import { IconCoin, IconSapphire, IconZoneLevel } from "../battle-counters/icons/_icons"

export const Counters = () => {
    const [tooltip, setTooltip] = useState<null | 1 | 2 | 3 | 4 | 5 | 6>(null)

    const tId = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {

        clearTimeout(tId.current);

        tId.current = setTimeout(() => {
            setTooltip(null)
        }, 6000)

    }, [tooltip])

    // if(mode !== 'invade') return <></>

    const trophy = zoneModel.selectors.useZoneTrophies()

    const rankExp = userModel.selectors.useRankExp()
    const rankLevel = userModel.selectors.useRankLevel()
    const progressExp = rankExp * 100 / Ranks.getExp(rankLevel as TRank);

    const sects = zoneModel.selectors.useZoneSectors()
    const zoneLevel = zoneModel.selectors.useZoneLevel()

    const zoneSects = sects - (ZoneLevel.getMaxLevelAllSectors(zoneLevel - 1 as TZoneLevel) || 0)
    const zoneProgress = zoneSects * 100 / ZoneLevel.getMaxLevelSectors(zoneLevel as TZoneLevel)

    return (
        <>
            <Counter
                width={74}
                onClick={() => setTooltip(1)}
                className={styles.__sector}
                icon={<IconZone width={23} height={23} style={{
                    marginTop: '-1px',
                    marginLeft: '-1px',
                }}/>}
                text={String(zoneModel.selectors.useZoneSectors())}
            >
                {tooltip === 1 ? (
                    <Tooltip
                        pos="right"
                        message="Все завоеванные территории"
                    />
                ) : <></>}
            </Counter>
            <Counter
                onClick={() => setTooltip(2)}
                width={74}
                className={styles.__trophy}
                icon={(
                    <IconTrophy />
                )}
                text={String(trophy)}
            >
                {tooltip === 2 ? <Tooltip
                    pos="right"
                    message="Трофеи за сражения на арене"
                /> : <></>}
            </Counter>

            <Counter
                width={74}
                onClick={() => setTooltip(3)}
                className={styles.__coin}
                icon={(
                    <IconCoin />
                )}
                text={String(zoneModel.selectors.useZoneCoins())}
            >

                {tooltip === 3 ? (
                    <Tooltip
                        pos="right"
                        message="Монеты"
                    />
                ) : <></>}

            </Counter>

            <Counter
                width={74}
                onClick={() => setTooltip(4)}
                className={styles.__sapphire}
                icon={<IconSapphire />}
                text={String(zoneModel.selectors.useZoneRubies())}
            >

                {tooltip === 4 ? <Tooltip
                    pos="right"
                    message="Кристаллы"
                /> : <></>}
            </Counter>

            <CounterProgress
                onClick={() => setTooltip(5)}
                className={styles.__experience}
                position="left"
                icon={<IconExperience />}
                progress={progressExp}
                color="#C163E0"
                counter={rankExp}
                width={73}
            >
                {tooltip === 5 ? (
                    <Tooltip
                        pos="left"
                        message="Опыт завоеваний"
                    />
                ) : <></>}
            </CounterProgress>

            <CounterProgress
                onClick={() => setTooltip(6)}
                className={styles.__zone}
                position="left"
                icon={<IconZoneLevel />}
                progress={zoneProgress}
                color="#C163E0"
                name={`Зона: ${zoneLevel} ур`}
                counter={zoneSects}
                width={73}
            >
                {tooltip === 6 ? (
                    <Tooltip
                        pos="left"
                        message="Гексы текущего уровня зоны"
                    />
                ) : <></>}
            </CounterProgress>

        </>
    )
}