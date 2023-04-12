import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TProgressBarCounter = {
    className: string,
    icon: ReactNode
    progress: ReactNode
}
export const ProgressBarCounter: FC<TProgressBarCounter> = ({
    icon,
    className,
    progress
}) => {
    return (
        <div className={`${styles.progressBarCounter} ${className}`}>
            <div className={styles.__icon}>
                {icon}
            </div>
            <div className={styles.__progress}>
                {progress}
            </div>
        </div>
    )
}