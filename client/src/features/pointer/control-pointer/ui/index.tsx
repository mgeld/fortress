import { FC } from "react";
import { Joystick as Control } from 'react-joystick-component';

import { useControl } from "../hooks/use-control";
import styles from './styles.module.scss'

const ControlPointer: FC = () => {

    const {
        stopPoint,
        moveControl
    } = useControl()
    
    return (
        <div className={styles.controlDirections}>
            <div className={styles.__circle}>
                <Control
                    size={74}
                    stickSize={48}
                    sticky={false}
                    baseColor="#ffffff00"
                    stickImage='icons/control_directions.png'
                    minDistance={30}
                    throttle={250}
                    move={moveControl}
                    stop={stopPoint}
                />
            </div>
        </div>
    )
}

export default ControlPointer