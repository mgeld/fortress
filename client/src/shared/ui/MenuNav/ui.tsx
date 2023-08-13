import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TMenuNavProps = {
    className: string,
    icon: ReactNode
    text: string
    onClick: () => void
}
export const MenuNav: FC<TMenuNavProps> = ({
    icon,
    className,
    text,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.menuNav} ${className}`}
        >

            <div className={styles.__icon}>
                {icon}
            </div>
            <div className={styles.__text}>
                <span>
                    {text}
                </span>
            </div>
            <div className={styles.__whiteEffect}><div /></div>

        </div>
    )
}