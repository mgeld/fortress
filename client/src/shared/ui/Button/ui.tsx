import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TButtonProps = {
    className: string,
    icon?: ReactNode
    text: string
    disabled?: boolean
    onClick: () => void
}
export const Button: FC<TButtonProps> = ({
    icon,
    className,
    text,
    disabled,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.button} ${className}`}
        >
            {disabled ? <div className={styles.disabled} /> : null}
            <div className={styles.__content}>
                {/* 
                <div className={styles.__icon}>
                    {icon}
                </div> */}
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