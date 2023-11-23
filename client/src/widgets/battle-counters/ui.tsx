import {
    IconZone, IconZoneRed
} from "./icons/_icons"

import { useEffect, useRef, useState } from "react"

import { CounterProgress } from "shared/ui/counter-progress"

import { Tooltip } from "shared/ui/tooltip/ui"

import styles from './styles.module.scss'
import { arenaModel } from "entities/arena"

export const BattleCounters = () => {

    const [tooltip, setTooltip] = useState<null | 1 | 2>(null)

    const tId = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {

        clearTimeout(tId.current);

        tId.current = setTimeout(() => {
            setTooltip(null)
        }, 6000)

    }, [tooltip])

    
    // const mode = mapModel.selectors.useMapMode().mode

    // if(mode !== 'battle') return <></>

    const myTeamId = arenaModel.selectors.useMyTeamId().data
    const teams = arenaModel.selectors.useTeams().data

    const myTeam = teams.filter(team => team.teamId === myTeamId)[0]
    const enemyTeam = teams.filter(team => team.teamId !== myTeamId)[0]
    
    const myProgress = myTeam?.sectors * 100 / 10
    const enemyProgress = enemyTeam?.sectors * 100 / 10

    return (
        <>
            <CounterProgress
                onClick={() => setTooltip(1)}
                className={styles.__teamBlue}
                position="left"
                icon={<IconZone />}
                progress={myProgress}
                color="#C163E0"
                name={`Вы`}
                counter={myTeam?.sectors}
                width={90}
            >
                {tooltip === 1 ? (
                    <Tooltip
                        pos="left"
                        message="Гексы текущего уровня зоны"
                    />
                ) : <></>}
            </CounterProgress>

            <CounterProgress
                onClick={() => setTooltip(2)}
                position="right"
                className={styles.__teamRed}
                icon={<IconZoneRed />}
                progress={enemyProgress}
                color="#D14343"
                name={`Противник`}
                counter={enemyTeam?.sectors}
                width={90}
            >
                {tooltip === 2 ? (
                    <Tooltip
                        pos="right"
                        message="Гексы текущего уровня зоны"
                    />
                ) : <></>}
            </CounterProgress>

        </>
    )
}