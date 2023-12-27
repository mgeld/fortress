import { FC } from "react";

import { Joystick as Control } from 'react-joystick-component';
// import { fireControl } from "../model";

import styles from './styles.module.scss'
import { useControl } from "../hooks/use-control";

const ControlFire: FC = () => {

    const { moveControl, stopFire } = useControl()

    return (
        <div className={styles.controlFire}>
            <div className={styles.__circle}>
                <Control
                    size={74}
                    stickSize={48}
                    sticky={false}
                    baseColor="#ffffff00"
                    stickImage='icons/control-fire.png'
                    minDistance={70}
                    throttle={500}
                    move={moveControl}
                    stop={stopFire}
                />
            </div>
        </div>
    )
}

export default ControlFire