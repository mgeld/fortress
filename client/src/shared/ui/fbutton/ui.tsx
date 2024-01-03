import { FC } from "react";

import styles from './styles.module.scss'

type FButtonProps = {
    width: number
    color: 'gold' | 'violet' | 'blue'
    text: string
    _click: () => void
}

export const FButton: FC<FButtonProps> = ({ width, text, _click, color }) => {
    return (
        <div
            className={`${styles.button} ${styles[color]}`}
            onClick={_click}
            style={{ width: `${width}px` }}
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