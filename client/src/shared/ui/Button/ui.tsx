import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

type TButtonProps = {
    className: string
    icon?: ReactNode
    radius?: number
    text: string
    disabled?: boolean
    onClick: () => void
}
export const Button: FC<TButtonProps> = ({
    radius = 6,
    className,
    text,
    disabled,
    onClick
}) => {
    return (
        <div
            style={{
                borderRadius: `${radius}px`
            }}
            onClick={onClick}
            className={`${styles.button} ${className}`}
        >
            {disabled ? <div
                style={{
                    borderRadius: `${radius / 1.5}px`,
                }}
                className={styles.disabled}
            /> : null}
            <div className={styles.__content}>
                <div className={styles.__text}>
                    <span>
                        {text}
                    </span>
                </div>
            </div>
            <div className={styles.__whiteEffect}>
                <div
                    style={{
                        borderRadius: `${radius / 1.5}px`,
                    }} />
            </div>
        </div>
    )
}