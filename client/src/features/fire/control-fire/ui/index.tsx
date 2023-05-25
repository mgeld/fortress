import { FC } from "react";

import { Joystick as Control } from 'react-joystick-component';
import { fireControl } from "../model";

import styles from './styles.module.scss'

const ControlFire: FC = () => {

    console.log('ControlFire---------')

    return (
        <div className={styles.controlFire}>
            <div className={styles.__circle}>
                <Control
                    size={94}
                    stickSize={52}
                    sticky={false}
                    baseColor="#ffffff00"
                    stickImage='icons/gun.png'
                    minDistance={80}
                    throttle={500}
                    move={fireControl}
                    stop={() => { }}
                />
            </div>
        </div>
    )
}

export default ControlFire