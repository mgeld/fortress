import { FC } from "react";

import { userModel } from "entities/user";
import { IconChat, IconFaq, IconFort, IconNews, IconShip, IconShop } from "./assets/icons";
// import { IconGun, IconShip } from "entities/ship/ui/assets/icons";

import styles from './styles.module.scss'
import { popoutModel } from "shared/ui/popout-root";
import { pageModel } from "shared/ui/page-root";
import Link from "shared/ui/link/ui";
import { TLatLng } from "@ctypes/model";
import { mapAPI, shipAPI } from "shared/api/events";
import { citadelModel } from "entities/citadel";
import { IconClose } from "shared/assets/icons/_icons";

export const Panel: FC = () => {

    // const photo = userModel.selectors.useUser().userIcon

    const latlng = citadelModel.selectors.useCitadel()?.latlng || null

    const selectCitadel = (pos: TLatLng | null) => {
        if (!pos) return
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
                {/* <div className={styles.profile}>
                    <div className={styles.left}>
                        <div className={styles.image}>
                            <img src={photo} alt="<>" />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.name}>Муса Гелдабаев</div>
                        <div className={styles.status}>Туда сюда</div>
                    </div>
                </div> */}
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

                        <Link
                            className={styles.section}
                            link='https://vk.me/join/P10Woc9dcjIul09klvEP2MKEOrsy/T0hFvI='
                        >
                            {/* <div className={styles.section}> */}

                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconChat width={44} height={44} />
                                </div>
                                <div className={styles.name}>Чат</div>
                            </div>
                            {/* </div> */}
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