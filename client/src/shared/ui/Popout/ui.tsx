import { FC, ReactNode, useContext } from "react";
import { PopoutRootContext, popoutModel } from "../popout-root";

import styles from './styles.module.scss'

type PopoutProps = {
    id: string
    fill: string
    edge?: number
    close?: boolean
    children: ReactNode
}
export const Popout: FC<PopoutProps> = ({
    id,
    fill,
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
                className={styles.__size}
                onClick={(e) => e.stopPropagation()}
                style={{ padding: `0 ${edge || 12}px` }}
            >
                {children}
            </div>
        </div>
    )
}