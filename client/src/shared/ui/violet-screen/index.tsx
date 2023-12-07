import { FC, ReactNode } from "react";
import { IconClose } from "shared/assets/icons/_icons";

import styles from './styles.module.scss'

type TVioletScreenProps = {
    name: string
    icon: ReactNode
    message: string
    action: {
        text: string
        _click: () => void
    }
}
export const VioletScreen: FC<TVioletScreenProps> = ({
    name,
    icon,
    message,
    action
}) => {

    return (
        <div className={styles.violetScreenRoot}>
            <div className={styles.violetPopout}>

                <div className={`${styles.__content} strw1`}>

                    <div className={styles.header}>

                        <div className={styles.__border}>
                            <div className={styles.name}>
                                {name}
                            </div>
                            <div
                                onClick={() => { }}
                                className={styles.close}
                            >
                                <IconClose width={16} height={16} fill="#ffffff" />
                            </div>
                        </div>

                        <div className={styles.__whiteEffect}><div /></div>

                    </div>

                    <div className={styles.main}>
                        <div className={styles.__icon}>
                            {icon}
                        </div>
                        <div className={styles.__text}>
                            {message}
                        </div>
                        <div className={styles.button}>
                            <div
                                className={styles.__action}
                                onClick={action._click}
                            >
                                {action.text}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}