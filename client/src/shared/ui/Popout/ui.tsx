import { FC, ReactNode, useContext } from "react";
import { PopoutRootContext, popoutModel } from "../popout-root";

import styles from './styles.module.scss'

type PopoutProps = {
    id: string
    fill: string
    screen?: 'full' | 'modal'
    edge?: number
    close?: boolean
    children: ReactNode
}
export const Popout: FC<PopoutProps> = ({
    id,
    fill,
    screen,
    edge,
    close,
    children
}) => {

    const activePopout = useContext(PopoutRootContext)

    if (activePopout !== id) return null

    const _close = () => {
        if (close === false) return
        popoutModel.events.setPopout(null)
    }

    return (
        <div
            onClick={_close}
            style={{ backgroundColor: fill }}
            className={styles.popout}
        >
            <div
                className={screen === 'full' ? styles.__full : styles.__size}
                onClick={(e) => e.stopPropagation()}
                style={{ padding: `0 ${edge}px` }}
            >
                {screen !== 'full' ? <div className={styles.main}>
                    {children}
                </div> : children}
            </div>
        </div>
    )
}