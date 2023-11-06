import { FC } from "react";

import { projectorControl } from "../model";
import styles from './styles.module.scss'

const ControlProjector: FC = () => {

    console.log('ControlInvader---------')

    return (
        <div className={styles.controlProjector}>
            <div className={styles.__circle}>
                <div
                    onClick={projectorControl}
                    className={styles.__button}>
                    <img src={'icons/control-beam.png'} alt="<>" width={50} height={50}/>
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

export default ControlProjector