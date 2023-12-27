import { FC, ReactNode } from "react";
import { IconClose } from "shared/assets/icons/_icons";

import styles from './styles.module.scss'
import { popoutModel } from "shared/ui/popout-root";
import bridge from "@vkontakte/vk-bridge";
import { zoneModel } from "entities/zone";
import { userModel } from "entities/user";
import { noticeModel } from "shared/ui/notice";

type TVioletScreenProps = {

}
export const AbductionLink: FC = () => {

    const zoneId = userModel.selectors.useUserId()

    return (
        <div className={styles.violetScreenRoot}>
            <div className={styles.violetPopout}>

                <div className={`${styles.__content}`}>

                    <div className={styles.header}>

                        <div className={styles.__border}>
                            <div className={styles.name}>
                                Похищение
                            </div>
                            <div
                                onClick={() => popoutModel.events.setPopout(null)}
                                className={styles.close}
                            >
                                <IconClose width={16} height={16} fill="#ffffff" />
                            </div>
                        </div>

                        <div className={styles.__whiteEffect}><div /></div>

                    </div>

                    <div className={styles.main}>
                        {/* <div className={styles.__icon}>
                            {icon}
                        </div> */}
                        <div className={styles.__text}>
                            Отправьте ссылку другу, которого хотите похитить и сделать одним из пришельцев
                        </div>
                        <div className={styles.__link}>
                            <div className={styles.__in}>
                                vk.com/app51787878#a{zoneId}
                            </div>
                        </div>
                        <div className={styles.button}>
                            <div
                                className={styles.__copy}
                                onClick={() => {
                                    bridge.send("VKWebAppCopyText", { "text": `https://vk.com/app51787878#a${zoneId}`})
                                    popoutModel.events.setPopout(null)
                                    noticeModel.events.newToast({
                                        name: 'Текст скопирован',
                                        text: 'Ссылка для похищения людей успешна скопирована!',
                                        t: 'common'
                                    })
                                }}
                            >
                                Скопировать
                            </div>
                            <div
                                className={styles.__share}
                                onClick={() => {
                                    bridge.send("VKWebAppShare", { "link": `https://vk.com/app51787878#a${zoneId}` })
                                    popoutModel.events.setPopout(null)
                                }}
                            >
                                Поделиться
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}