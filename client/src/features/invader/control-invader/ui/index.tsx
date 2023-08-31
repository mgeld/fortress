import { FC } from "react";

import { Joystick as Control } from 'react-joystick-component';
import { invaderControl } from "../model";

import styles from './styles.module.scss'

const ControlInvader: FC = () => {

    console.log('ControlInvader---------')

    return (
        <div className={styles.controlInvader}>
            <div className={styles.__circle}>
                <div
                    onClick={invaderControl}
                    className={styles.__button}>
                    <img src={'icons/control-invaders.png'} alt="<>" />
                </div>
                {/* <Control
                    size={94}
                    stickSize={62}
                    sticky={false}
                    baseColor="#ffffff00"
                    stickImage=''
                    minDistance={80}
                    throttle={300}
                    move={invaderControl}
                    stop={() => { }}
                /> */}
            </div>
        </div>
    )
}

export default ControlInvader