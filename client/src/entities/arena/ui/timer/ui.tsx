import { FC, useEffect, useState } from "react";

import { arenaModel } from "entities/arena";

import styles from './styles.module.scss'
import { battleAPI } from "shared/api/events";

const timeFormat = (function () {
    function num(sec: number) {
        sec = Math.floor(sec);
        return sec < 10 ? '0' + sec : sec;
    }
    return function (sec: number/**number*/) {
        const minutes = sec / 60 % 60
        const seconds = sec % 60
        return num(minutes) + ":" + num(seconds);
    };
})();

export const Timer: FC = () => {

    const seconds = arenaModel.selectors.useBattleTimer().data

    // console.log('Timer seconds', seconds)
    // const [timer, setTimer] = useState(seconds)

    useEffect(() => {
        if (seconds > 0)
            setTimeout(() => battleAPI.events.stepTimer(), 1000)
    }, [seconds])

    return (
        <div className={`${styles.timer}`}>
            <div className={`${styles.__text} strw2`}>
                {timeFormat(seconds)}
            </div>
        </div>
    )
}