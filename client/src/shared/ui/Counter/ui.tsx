import { FC, ReactNode, useEffect, useState } from "react";

import styles from './styles.module.scss'
import { Tooltip } from "react-leaflet";

type TCounterProps = {
    className: string
    width: number
    icon?: ReactNode
    text: string
    onClick: () => void
    children: ReactNode
}
export const Counter: FC<TCounterProps> = ({
    icon,
    width,
    className,
    text,
    onClick,
    children
}) => {


    return (
        <div
            onClick={onClick}
            style={{ width: `${width}px` }}
            className={`${styles.__counter} ${className}`}
        >
            {children}
            <div className={styles.__content}>
                <div className={styles.__icon}>
                    {icon}
                </div>
                <div className={styles.__text}>
                    <span>
                        {text}
                    </span>
                </div>
            </div>
            <div className={styles.__whiteEffect}><div /></div>
        </div>
    )
}