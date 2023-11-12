import { FC } from "react";

import styles from './styles.module.scss'

type TTooltiProps = {
    pos: 'left' | 'right'
    message: string
}

export const Tooltip: FC<TTooltiProps> = ({ pos, message }) => {

    return (
        <div className={`${styles.tooltipRoot} ${styles['p-'+pos]}`}>
            <div
                className={styles.main}
            >
                {message}
            </div>
        </div>
    )
}