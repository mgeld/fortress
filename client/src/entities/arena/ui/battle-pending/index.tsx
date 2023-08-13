import { FC } from "react";
import { IconLoupe, IconShieldSword, IconSwords } from "shared/assets/icons/_icons";
import { Button } from "shared/ui/Button/ui";

import styles from './styles.module.scss'

export const BattlePending: FC = () => {
    return (
        <div className={styles.battlePending}>
            <div className={styles.__content}>

                <div className={styles.__shield}>
                    <IconShieldSword />
                </div>

                <div className={styles.__swords}>
                    <IconSwords width={76} height={76} />
                </div>
                <div className={styles.__text}>
                    Поиск противников<span>...</span>
                </div>
                <div className={styles.__search}>
                    <IconLoupe />
                </div>

                <div className={styles.__button}>
                    <Button
                        className=""
                        text="Прервать"
                        onClick={() => { }}
                    />
                </div>

            </div>
        </div>
    )
}