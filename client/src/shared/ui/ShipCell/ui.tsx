import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/PopoutRoot";

import { IconLevelUp, IconPlus } from "entities/ship/ui/assets/icons";

type TShipCellProps = {
    head: {
        name: string
        level_name: string
        level: number
        icon: ReactNode
    }
    items: {
        // icon: ReactNode
        name: string
        counter: string
        _click?: () => void
    }[]
}
export const ShipCell: FC<TShipCellProps> = ({
    head,
    items
}) => {

    const closePopout = () => popoutModel.events.setPopout(null)

    return (
        <div className={styles.shipItem}>

            <div className={styles.header}>
                <div className={styles.__border}>
                    {head.name}
                </div>
            </div>

            <div className={styles.__content}>

                <div className={styles.main}>

                    <div className={styles.__info}>

                        <div className={styles.head}>
                            <div className={`${styles.name}`}>{head.level_name}</div>
                            <div className={styles.level}>
                                <span>{head.level} ур.</span>
                                <div
                                    className={styles.levelUp}
                                >
                                    <IconLevelUp width={18} height={18} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.__icon}>
                            {head.icon}
                        </div>

                    </div>

                    <div className={styles.units}>
                        {items.map(unit => {
                            return (
                                <div className={styles.__unit}>
                                    <div className={styles.name}>
                                        {/* <div className={styles.icon}>
                                                {unit.icon}
                                            </div> */}
                                        <div className={styles.text}>
                                            {unit.name}
                                        </div>
                                    </div>
                                    <div className={styles.__line}></div>
                                    <div className={styles.counter}>
                                        <div
                                            onClick={unit._click ? unit._click : () => { }}
                                            className={styles.levelUp}
                                        >
                                            {/* <div className={styles.__icon}> */}
                                            <IconPlus width={18} height={18} />
                                            {/* </div> */}
                                            {/* <div className={styles.__text}>Улучшить</div> */}
                                        </div>
                                        <span>{unit.counter}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div className={styles.actions}>
                    <div className={styles.inside}>
                        <div
                            onClick={closePopout}
                            className={`${styles.button} ${styles.__white}`}
                        >
                            Закрыть
                        </div>
                        <div
                            // onClick={() => onUseExtraction()}
                            className={styles.button}
                        >
                            Закрыть
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}


