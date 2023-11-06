import { FC } from "react";

import { userModel } from "entities/user";
import { IconChat, IconFaq, IconFort, IconNews, IconShip, IconShop } from "./assets/icons";
// import { IconGun, IconShip } from "entities/ship/ui/assets/icons";

import styles from './styles.module.scss'
import { pageModel } from "shared/ui/PageRoot";
import { popoutModel } from "shared/ui/PopoutRoot";

export const Panel: FC = () => {

    const photo = userModel.selectors.useUser().userIcon

    return (
        <div className={styles.panel}>
            <div className={styles.__header}>
                <div className={styles.__border}>
                    Навигатор
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

                        <div className={styles.section}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconShip width={44} height={44} />
                                </div>
                                <div className={styles.name}>Корабль</div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconFort width={44} height={44} />
                                </div>
                                <div className={styles.name}>Цитадель</div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconChat width={44} height={44} />
                                </div>
                                <div className={styles.name}>Чат</div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconNews width={44} height={44} />
                                </div>
                                <div className={styles.name}>Новости</div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <IconFaq width={44} height={44} />
                                </div>
                                <div className={styles.name}>FAQ</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}