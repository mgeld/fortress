import { FC } from "react";

import styles from './styles.module.scss'

type FButtonProps = {
    text: string
    _click: () => void
}
export const FButton: FC<FButtonProps> = ({ text, _click }) => {
    return (
        <div
            className={styles.button}
            onClick={_click}
        >
            <div className={styles.couche2}>
                <div className={styles.couche3}>
                    <div className={styles.couche4}>
                        <div className={styles.couche5}>

                            <span className={styles.text}>{text}</span>
                            <div className={styles.couche6}></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}