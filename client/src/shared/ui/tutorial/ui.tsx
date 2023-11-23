import { FC } from "react";

import { tutorialModel } from ".";
import { TTutType } from "@ctypes/model";

import styles from './styles.module.scss'

// import { TTutorialType } from "@ctypes/model";

type TDate = {
    name: string
    description: string
    // next: TTutType | null
}

export const Tutorial: FC = () => {

    const card = tutorialModel.selectors.useTutorial()

    if (!card) return <></>

    const cards: Record<TTutType, TDate> = {
        ship: {
            name: 'Джойстик передвижения',
            description: `Проведите пальцем по этому джойстику и ваш корабль будет двигаться в том направлении, в котором тянется джойстик`,
            // next: 'storm'
        },
        storm: {
            name: 'Кнопка захвата',
            description: `Чтобы захватывать башни и территории вокруг них, используйте выделенную кнопку.
            Она выпускает из корабля штурмовые дроны, которые нападают на ближайшую башню`,
            // next: 'projector'
        },
        projector: {
            name: 'Кнопка луча',
            description: `В некоторых завоеванных башнях находятся полезные предметы для развития вашей зоны.
            Нажмите на данную кнопку для выпуска из корабля притягивающего луча, чтобы собирать найденные предметы`,
            // next: 'gun'
        },
        gun: {
            name: 'Джойстик атаки',
            description: `Пушка нужна для защиты и нападения на вражеские корабли других игроков.
            Перемещение пальца по этому джойстику приведет к выстрелам из пушки в том направлении, в котором тянется джойстик`,
            // next: null
        },
        hold: {
            name: 'Трюм корабля',
            description: `Все собранные лучом предметы заносятся в трюм корабля.
            Нажмите на эту кнопку, чтобы открыть трюм, а затем выберите предмет, который хотите использовать`,
            // next: null
        },
    }

    return (
        <div
            className={`${styles.tutorialRoot} ${styles[card]}`}
            // onClick={() => tutorialModel.events.setTutorial(null)}
        >
            <div className={`${styles.main} strw1`}>
                <div className={styles.name}>
                    {cards[card].name}
                </div>
                <div className={styles.description}>
                    {cards[card].description}
                </div>
                <div
                    className={styles.next}
                    // onClick={() => tutorialModel.events.setTutorial(cards[card].next)}
                    onClick={() => tutorialModel.events.setTutorial(null)}
                >
                    <div>
                        {/* {cards[card].next ? 'Далее' : 'Понятно!'} */}
                        {'Понятно!'}
                    </div>
                </div>

            </div>

        </div>
    )
}