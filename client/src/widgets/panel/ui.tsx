import { FC } from "react";

import {
    IconChat,
    IconFaq,
    IconFort,
    IconNews,
    IconShip,
    IconShop
} from "./assets/icons";

import Link from "shared/ui/link/ui";

import { TLatLng } from "@ctypes/model";
import { alertModel } from "shared/ui/alert";
import { pageModel } from "shared/ui/page-root";
import { citadelModel } from "entities/citadel";
import { abductionAPI, mapAPI, shipAPI } from "shared/api/events";
import { popoutModel } from "shared/ui/popout-root";
import { IconAlien, IconClose, IconShipBeam, IconTerrain, IconUFO } from "shared/assets/icons/_icons";

import { IconTrophy } from "widgets/map-region/counters/icons/_icons";

import { getRatingAPI } from "shared/api/get-rating";

import { setSelectMyZone } from "features/user/select-zone";

import styles from './styles.module.scss'
import { getAbductionAPI } from "shared/api/get-abduction";
import { abductionModel } from "widgets/abduction";

export const Panel: FC = () => {

    const latlng = citadelModel.selectors.useCitadel()?.latlng || null

    const selectCitadel = (pos: TLatLng | null) => {
        if (!pos) {
            popoutModel.events.setPopout('alert')
            alertModel.events.setAlert({
                alert: 'Цитадель',
                message: 'Цитадель - это центр вашей зоны и первая захваченная башня. Вы еще не захватили ни одной башни!',
                action: {
                    close: false,
                    text: 'Начать захват',
                    _click: () => popoutModel.events.setPopout(null)
                }
            })
            return
        }
        mapAPI.events.setMapMode('invade')
        shipAPI.events.setPos(pos)
        popoutModel.events.setPopout(null)
    }

    const selectShip = () => {
        popoutModel.events.setPopout('ship')
    }

    const close = () => popoutModel.events.setPopout(null)

    return (
        <div className={styles.panel}>
            <div className={styles.__header}>
                <div className={styles.__border}>
                    <div className={styles.name}>
                        Навигатор
                    </div>
                    <div
                        onClick={close}
                        className={styles.close}
                    >
                        <IconClose width={16} height={16} fill="#867aa0" />
                    </div>
                </div>
            </div>
            <div className={styles.__content}>
                <div className={styles.sections}>
                    <div className={styles.__flex}>

                        <div
                            onClick={() => {
                                popoutModel.events.setPopout(null)
                                pageModel.events.setPage('gun-shop')
                            }}
                            className={styles.section}
                        >
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconShop width={44} height={44} />
                                </div>
                                <div className={styles.name}>Магазин</div>
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                popoutModel.events.setPopout(null)
                                pageModel.events.setPage('rating')
                                getRatingAPI()
                            }}
                            className={styles.section}
                        >
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <div className={styles.svg}>
                                        <IconTrophy width={32} height={32} />
                                    </div>
                                </div>
                                <div className={styles.name}>Рейтинг</div>
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                popoutModel.events.setPopout(null)
                                setSelectMyZone()
                                pageModel.events.setPage('zone')
                            }}
                            className={styles.section}
                        >
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconTerrain width={44} height={44} />
                                </div>
                                <div className={styles.name}>Зона</div>
                            </div>
                        </div>

                        <div
                            onClick={selectShip}
                            className={styles.section}
                        >
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconShip width={44} height={44} />
                                </div>
                                <div className={styles.name}>Корабль</div>
                            </div>
                        </div>

                        <div
                            onClick={() => selectCitadel(latlng)}
                            className={styles.section}
                        >
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconFort width={44} height={44} />
                                </div>
                                <div className={styles.name}>Цитадель</div>
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                popoutModel.events.setPopout(null)
                                pageModel.events.setPage('abduction')
                                abductionModel.events.getMyAbduction()
                            }}
                            className={styles.section}
                        >
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <div className={styles.svg}>
                                        <IconAlien width={42} height={42} />
                                    </div>
                                </div>
                                <div className={styles.name}>Похищенные</div>
                            </div>
                        </div>

                        <Link
                            className={styles.section}
                            link='https://vk.me/join/P10Woc9dcjIul09klvEP2MKEOrsy/T0hFvI='
                        >
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconChat width={44} height={44} />
                                </div>
                                <div className={styles.name}>Чат</div>
                            </div>
                        </Link>

                        <Link
                            className={styles.section}
                            link='https://vk.com/club223383803'
                        >
                            {/* <div className=> */}
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconNews width={44} height={44} />
                                </div>
                                <div className={styles.name}>Новости</div>
                            </div>
                            {/* </div> */}
                        </Link>


                        <Link
                            className={styles.section}
                            link='https://vk.com/@-223383803-faq'
                        >
                            {/* <div className={styles.section}> */}
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconFaq width={44} height={44} />
                                </div>
                                <div className={styles.name}>FAQ</div>
                            </div>
                            {/* </div> */}
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}