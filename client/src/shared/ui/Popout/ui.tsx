import { FC, ReactNode, useContext } from "react";
import { PopoutRootContext } from "../PopoutRoot";

import styles from './styles.module.scss'

type PopoutProps = {
    id: string
    fill: string
    children: ReactNode
}
export const Popout: FC<PopoutProps> = ({
    id,
    fill,
    children
}) => {

    const activePopout = useContext(PopoutRootContext)

    if (activePopout !== id) return null

    return (
        <div
            style={{ backgroundColor: fill }}
            className={styles.popout}
        >
            {children}
        </div>
    )
}