import { FC } from "react";

import styles from './styles.module.scss'
import { IconLocation, IconTouch } from "./icons/_icons";
import { Button } from "shared/ui/button/ui";
import { popoutModel } from "shared/ui/popout-root";
import { mapModel } from "entities/map";
import { getRandomPosition } from "shared/lib/get-random-position";
import bridge from "@vkontakte/vk-bridge";
import { TLatLng } from "@ctypes/model";
import { noticeModel } from "shared/ui/notice";
import { tutorialModel } from "shared/ui/tutorial";

export const SelectPlace: FC = () => {

    const map = mapModel.selectors.useMapLayout()

    const selectPlace = () => {
        // map?.flyTo(map.getCenter(), 8)
        map?.setView(map.getCenter(), 8)
        popoutModel.events.setPopout(null)
    }

    const setRandPos = () => {
        const pos = getRandomPosition()
        mapModel.events.setLatLngMap(pos)
        popoutModel.events.setPopout(null)
        // map?.flyTo(pos, 16)
        map?.setView(pos, 16)

        console.log('flyTo 1111')
    }

    const getGeo = async () => {
        await bridge
            .send("VKWebAppGetGeodata")
            .then(data => {

                if (data.available) {
                    const pos: TLatLng = [data.lat, data.long]
                    mapModel.events.setLatLngMap(pos)
                    popoutModel.events.setPopout(null)
                    map?.setView(pos, 16)
                } else {
                    noticeModel.events.newToast({
                        name: 'Ошибка',
                        text: 'Не удалось определить ваше местопложение!',
                        t: 'common'
                    })
                }

            }).catch(error => {
                noticeModel.events.newToast({
                    name: 'Ошибка',
                    text: 'Не удалось определить ваше местопложение!',
                    t: 'common'
                })
            })

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
                            text="Местоположение"
                            onClick={getGeo}
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
                                    text="Случайное"
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