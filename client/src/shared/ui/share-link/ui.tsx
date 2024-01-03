import { FC } from "react"
import { IconClose } from "shared/assets/icons/_icons"

import { popoutModel } from "shared/ui/popout-root"
import { noticeModel } from "shared/ui/notice"

import bridge from "@vkontakte/vk-bridge"

import styles from './styles.module.scss'

type TShareLinkProps = {
    header: string
    text: string
    link: string
}

export const ShareLink: FC<TShareLinkProps> = ({
    header,
    link,
    text
}) => {

    return (
        <div className={styles.violetScreenRoot}>
            <div className={styles.violetPopout}>

                <div className={`${styles.__content}`}>

                    <div className={styles.header}>

                        <div className={styles.__border}>
                            <div className={styles.name}>
                                {header}
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
                        <div className={styles.__text}>
                            {text}
                        </div>
                        <div className={styles.__link}>
                            <div className={styles.__in}>
                                {link}
                            </div>
                        </div>
                        <div className={styles.button}>
                            <div
                                className={styles.__copy}
                                onClick={() => {
                                    bridge.send("VKWebAppCopyText", { "text": link})
                                    popoutModel.events.setPopout(null)
                                    noticeModel.events.newToast({
                                        name: 'Текст скопирован',
                                        text: 'Ссылка успешна скопирована!',
                                        t: 'common'
                                    })
                                }}
                            >
                                Скопировать
                            </div>
                            <div
                                className={styles.__share}
                                onClick={() => {
                                    bridge.send("VKWebAppShare", { "link": link })
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