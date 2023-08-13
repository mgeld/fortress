import { FC } from "react";
import { arenaModel } from "entities/arena";
import { IconShieldSword, IconSwords, IconTrophy } from "shared/assets/icons/_icons";
import { Button } from "shared/ui/Button/ui";

import { pointerMapModel } from "entities/pointer";
import { userModel } from "entities/user";

import styles from './styles.module.scss'
import { battleAPI, mapAPI } from "shared/api/events";
import { popoutModel } from "shared/ui/PopoutRoot";

export const BattleOver: FC = () => {

    const userId = userModel.selectors.useUserId()

    const teams = arenaModel.selectors.useTeams().data

    const userTeam = teams.find(team => team.members.find(member => member.userId === userId))

    teams.sort((a,b) => a.teamId === userTeam?.teamId ? -1 : 1)

    const pointers = pointerMapModel.selectors.usePointers().data

    const exitBattle = () => {
        mapAPI.events.setMapMode('invade')
        popoutModel.events.setPopout(null)
        userModel.events.resetUser()
        battleAPI.events.setTeams([])
        battleAPI.events.setBattleStatus('default')
    }

    return (
        <div className={styles.battleOver}>
            <div className={styles.__content}>

                <div className={styles.__shield}>
                    <IconShieldSword />
                </div>

                {teams.map((team, i) => {
                    return (
                        <div className={[styles.__team, styles[team.status], styles[`team${i}`]].join(' ')}>

                            {team.teamId === userTeam?.teamId && (<>
                                <div className={styles.__swords}>
                                    <IconSwords width={64} height={64} />
                                </div>
                                <div className={styles.__header}>
                                    <div className={styles.__left}>
                                        {team.status === 'victory' ? 'Победа!' : 'Поражение!'}
                                        {/* <svg className="text-stroke">
                                            <text x="5px" y="75%">
                                                Победа!
                                            </text>
                                        </svg> */}
                                    </div>
                                    <div className={styles.__right}>
                                        <div className={styles.__icon}>
                                            <IconTrophy width={34} height={34} />
                                        </div>
                                        <div className={styles.__text}>
                                            {team.status === 'victory' ? '+' : ''}{userTeam.members.find(pointer => pointer.userId === userId)?.trophies}
                                        </div>
                                    </div>
                                </div>
                            </>)}

                            <div className={styles.__users}>

                                {team.members.map(member => {

                                    const pointer = pointers.find(pointer => pointer.userId === member.userId)

                                    return (
                                        <div className={styles.__user}>

                                            <div className={styles.__icon}>
                                                <img src={pointer?.icon} alt={''} />
                                            </div>

                                            <div className={styles.__username}>
                                                {pointer?.userName}
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

                <div className={styles.__button}>
                    <Button
                        className=""
                        text="Ок"
                        onClick={exitBattle}
                    />
                </div>

            </div>
        </div>
    )
}