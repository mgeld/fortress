import { FC } from "react";

import { IconTouch } from "./icons/_icons";
import { mapModel } from "entities/map";
import { TLatLng } from "@ctypes/model";
import { Button } from "shared/ui/button/ui";
import { noticeModel } from "shared/ui/notice";
import { popoutModel } from "shared/ui/popout-root";
import { getRandomPosition } from "shared/lib/get-random-position";

import bridge from "@vkontakte/vk-bridge";

import styles from './styles.module.scss'

export const SelectPlace: FC = () => {

    const map = mapModel.selectors.useMapLayout()

    const selectPlace = () => {
        // map?.flyTo(map.getCenter(), 8)
        map?.setView(map.getCenter(), 8)
        popoutModel.events.setPopout(null)
    }

    const setRandPos = () => {
        const pos = getRandomPosition()
        popoutModel.events.setPopout(null)
        // map?.flyTo(pos, 16)
        map?.setView(pos, 16)
        mapModel.events.setLatLngMap(pos)
    }

    const getGeo = async () => {
        await bridge
            .send("VKWebAppGetGeodata")
            .then(data => {
                if (data.available) {
                    const pos: TLatLng = [data.lat, data.long]
                    if (pos[0] > 0 && pos[1] > 0) {
                        popoutModel.events.setPopout(null)
                        map?.setView(pos, 16)
                        mapModel.events.setLatLngMap(pos)
                    } else {
                        noticeModel.events.newToast({
                            name: 'Упс...',
                            text: 'В вашей стране пока нельзя завоевывать территории, но вы можете выбрать любое место в России или странах СНГ!',
                            t: 'common'
                        })
                    }
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
                    {/* <div className={styles.icon}>
                        <IconGlob width={60} height={60}/>
                    </div> */}
                    <div className={styles.geoPlace}>
                        <Button
                            radius={10}
                            className=""
                            text="Геолокация"
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
                                    radius={10}
                                    className=""
                                    text="Случайное"
                                    onClick={setRandPos}
                                />
                            </div>
                            <div className={styles.__selectPlace}>
                                <Button
                                    radius={10}
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