import { FC } from "react";

import styles from './styles.module.scss'
import { IconLocation, IconTouch } from "./icons/_icons";
import { Button } from "shared/ui/Button/ui";
import { popoutModel } from "shared/ui/PopoutRoot";
import { mapModel } from "entities/map";
import { getRandomPosition } from "shared/lib/get-random-position";

export const SelectPlace: FC = () => {

    const map = mapModel.selectors.useMapLayout()

    const selectPlace = () => popoutModel.events.setPopout(null)

    const setRandPos = () => {
        const pos = getRandomPosition()
        mapModel.events.setLatLngMap(pos)
        popoutModel.events.setPopout(null)
        map?.flyTo(pos, 15)
    }

    return (
        <div className={styles.selectPlace}>
            <div className={styles.__content}>

                <div className={styles.header}>
                    <div className={styles.name}>
                        Выбор территории
                    </div>
                    <div className={styles.icon}>
                        <IconLocation />
                    </div>
                    <div className={styles.geoPlace}>
                        <Button
                            className=""
                            text="Геолокация"
                            onClick={() => { }}
                        />
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.icon}>
                            <IconTouch />
                        </div>
                        <div className={styles.text}>
                            Коснитесь карты, чтобы выбрать место, где вы начнете захватывать территории
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.buttons}>
                            <div className={styles.__randomPlace}>
                                <Button
                                    className=""
                                    text="Рандом"
                                    onClick={setRandPos}
                                />
                            </div>
                            <div className={styles.__selectPlace}>
                                <Button
                                    className=""
                                    text="Выбрать"
                                    onClick={selectPlace}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}