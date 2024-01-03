import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TBottomFlexProps = {
    text: string
    button: ReactNode
}

export const BottomFlex: FC<TBottomFlexProps> = ({
    text,
    button
}) => {
    return (
        <div className={styles.bottomFlex}>
            <div className={styles.__content}>
                <div className={`${styles.__nameMode} shb`}>
                    {text}
                </div>
                <div className={styles.__buttonMode}>
                    {button}
                </div>
            </div>
        </div>
    )
}