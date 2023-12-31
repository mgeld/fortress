import { FC } from "react";
import { arenaModel } from "entities/arena";
import { Button } from "shared/ui/button/ui";

import { pointerMapModel } from "entities/pointer";
import { userModel } from "entities/user";

import styles from './styles.module.scss'

import { battleAPI, mapAPI, sectorsAPI } from "shared/api/events";
import { popoutModel } from "shared/ui/popout-root";
import { IconBattleSwords, IconCoin } from "shared/assets/icons/_icons";
import { shipModel } from "entities/ship";
import IconBattleShield from 'shared/assets/icons//battle-shield.png';
import IconBattleShieldRed from 'shared/assets/icons//battle-shield-red.png';
import { IconTrophy } from "widgets/map-region/counters/icons/_icons";

export const BattleOver: FC = () => {

    // const userId = userModel.selectors.useUserId()
    const user = userModel.selectors.useUser()

    const teams = arenaModel.selectors.useTeams().data

    const userTeam = teams.find(team => team.members.find(member => member.userId === user.userId))

    teams.sort((a, b) => a.teamId === userTeam?.teamId ? -1 : 1)

    const pointers = pointerMapModel.selectors.usePointers().data

    const leaveBattle = () => {
        pointerMapModel.events.clearStore()
        sectorsAPI.events.setSectors([])
        mapAPI.events.setMapMode('invade')
        popoutModel.events.setPopout(null)
        battleAPI.events.setTeams([])
        battleAPI.events.setTimer(0)
        battleAPI.events.setBattleStatus('default')
        shipModel.events.resetUser()
    }

    const myExtr = userTeam ? userTeam.members.find(pointer => pointer.userId === user.userId) || {
        coins: 0,
        trophies: 0
    } : {
        coins: 0,
        trophies: 0
    }

    return (
        <div className={styles.battleRoot}>
            <div className={styles.battleOver}>
                <div className={styles.__content}>

                    <div className={styles.__shield}>

                        {userTeam?.status === 'victory' || userTeam?.status === 'draw' ?
                            <img src={IconBattleShield} alt="<>" /> :
                            <img src={IconBattleShieldRed} alt="<>" />}
                    </div>

                    {teams.map((team, i) => {
                        if (team.members.length < 1) return <></>
                        return (
                            <div className={[styles.__team, styles[team.status], styles[`team${i}`]].join(' ')}>

                                {team.teamId === userTeam?.teamId && (<>
                                    <div className={styles.__header}>
                                        <div className={styles.__left}>
                                            {team.status === 'victory' ? 'Победа!' : team.status === 'defeat' ? 'Поражение :(' : 'Ничья :('}
                                        </div>
                                        <div className={styles.__right}>
                                            <div className={styles.__icon}>
                                                <IconCoin width={34} height={34} />
                                            </div>
                                            <div className={styles.__text}>
                                                {myExtr.coins > 0 ? `+${myExtr.coins}` : myExtr.coins}
                                            </div>
                                        </div>
                                    </div>
                                </>)}

                                {team.members.length > 0 && team.teamId !== userTeam?.teamId && (
                                    <div className={styles.__swords}>
                                        <IconBattleSwords width={52} height={52} />
                                    </div>
                                )}

                                <div className={styles.__users}>

                                    {team.members.map(member => {

                                        const pointer = (member.userId === user.userId) ? {
                                            name: user.userName,
                                            icon: user.userIcon
                                        } : pointers.find(pointer => pointer.userId === member.userId)

                                        return (
                                            <div className={styles.__user}>

                                                <div className={styles.__icon}>
                                                    <img src={pointer?.icon} alt={''} />
                                                </div>

                                                <div className={styles.__username}>
                                                    {pointer?.name}
                                                </div>

                                                <div className={styles.__trophies}>
                                                    <div className={styles.__icon}>
                                                        <IconTrophy width={30} height={30} />
                                                    </div>
                                                    <div className={styles.__text}>
                                                        <span>
                                                            {member.trophies >= 0 ? '+' + member.trophies : member.trophies}
                                                        </span>
                                                    </div>
                                                    <div className={styles.__whiteEffect}><div /></div>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    })}

                    <div className={styles.button}>
                        <Button
                            className={`${styles.__button} strw1`}
                            text="Вернуться"
                            radius={10}
                            onClick={leaveBattle}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}