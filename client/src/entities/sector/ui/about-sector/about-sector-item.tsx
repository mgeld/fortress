import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TAboutSectorItemProps = {
    icon: ReactNode
    text: string
    name: string
}
export const AboutSectorItem: FC<TAboutSectorItemProps> = ({
    icon,
    text,
    name
}) => {
    return (
        <div className={styles.__item}>
            <div className={styles.__icon}>{icon}</div>
            <div className={styles.__name}>{name}</div>
            <div className={styles.__text}>{text}</div>
        </div>
    )
}