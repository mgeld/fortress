import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TCounterProgress = {
    className: string
    position: 'left' | 'right'
    icon: ReactNode
    width: number
    name?: string
    counter: number
    progress: number
    color: string
    onClick: () => void
    children: ReactNode
}
export const CounterProgress: FC<TCounterProgress> = ({
    icon,
    className,
    position,
    width,
    name,
    counter,
    progress,
    color,

    onClick,
    children
}) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.counterProgress} ${className}`}
        >

            <div className={styles.__icon}>
                {icon}
            </div>
            
            <div className={`${styles.__progress} ${styles['__'+position]}`}>

                {children}

                <div
                    className={styles.progress}
                    style={{ width: `${width}px` }}
                >
                    {name ? <div className={`${styles.__name} strw1`}>
                        {name}
                    </div> : null}

                    <div
                        className={styles.__progressBar}
                    >
                        <div
                            className={styles.__prefix}
                            style={{
                                backgroundColor: color
                            }}
                        />
                        <div className={styles.__wrapper}>
                            <div
                                className={styles.__load}
                                style={{
                                    width: `${progress > 100 ? 100 : progress}%`,
                                    backgroundColor: color
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles.__counter}>
                        <span>{counter}</span>
                    </div>

                    <div className={styles.__whiteEffect}>
                        <div />
                    </div>

                </div>

            </div>
        </div>
    )
}


