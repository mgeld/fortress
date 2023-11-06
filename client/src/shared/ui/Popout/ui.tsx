import { FC, ReactNode, useContext } from "react";
import { PopoutRootContext } from "../PopoutRoot";

import styles from './styles.module.scss'

type PopoutProps = {
    id: string
    fill: string
    edge?: number
    children: ReactNode
}
export const Popout: FC<PopoutProps> = ({
    id,
    fill,
    edge,
    children
}) => {

    const activePopout = useContext(PopoutRootContext)

    if (activePopout !== id) return null

    return (
        <div
            style={{ backgroundColor: fill }}
            className={styles.popout}
        >
            <div
                className={styles.__size}
                style={{ padding: `0 ${edge || 12}px` }}
            >
                {children}
            </div>
        </div>
    )
}