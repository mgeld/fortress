import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TCounterProgress = {
    className: string,
    icon: ReactNode
    width: number
    name?: string
    counter: number
    progress: number
    color: string
}
export const CounterProgress: FC<TCounterProgress> = ({
    icon,
    className,
    width,
    name,
    counter,
    progress,
    color
}) => {
    return (
        <div className={`${styles.counterProgress} ${className}`}>
            <div className={styles.__icon}>
                {icon}
            </div>
            <div className={styles.__progress}>

                <div
                    className={styles.progress}
                    style={{ width: `${width}px` }}
                >
                    {name ? <div className={`${styles.__name} strw1`}>
                        {name}
                    </div> : null}

                    <div
                        className={styles.__progressBar}
                        style={{
                            width: `${progress}%`,
                            backgroundColor: color
                        }}
                    />
                    <div className={styles.__counter}>
                        <span>{counter}</span>
                    </div>

                    <div className={styles.__whiteEffect}><div /></div>
                </div>
            </div>
        </div>
    )
}


