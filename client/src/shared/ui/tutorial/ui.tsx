import { FC, useState } from "react";

import styles from './styles.module.scss'
import { tutorialModel } from ".";
import { TCard } from "./model";



type TDate = {
    name: string
    description: string
    next: TCard | null
}

export const Tutorial: FC = () => {

    const card = tutorialModel.selectors.useTutorial()

    if (!card) return <></>

    const cards: Record<TCard, TDate> = {
        ship: {
            name: 'Джойстик передвижения',
            description: `Чтобы манипулировать виртуальным джойстиком, проведедите пальцем по этой кнопке, и ваш корабль будет двигаться в том направлении, в котором тянется джойстик`,
            next: 'storm'
        },
        storm: {
            name: 'Кнопка захвата',
            description: `Чтобы захватывать башни и территории вокруг них, используйте выделенную кнопку.
            Она выпускает из корабля штурмовые дроны, которые нападают на ближайшую башню`,
            next: 'projector'
        },
        projector: {
            name: 'Кнопка луча',
            description: `В некоторых завоеванных башнях находятся полезные предметы для развития вашей зоны.
            Нажмите на данную кнопку для выпуска из корабля притягивающего луча, чтобы собирать найденные предметы`,
            next: 'gun'
        },
        gun: {
            name: 'Джойстик атаки',
            description: `Пушка нужна для защиты и нападения на вражеские корабли других игроков.
            Перемещение пальца по этому джойстики приведет к выстрелам из пушки в том направлении, в котором тянется джойстик`,
            next: null
        },
    }


    return (
        <div className={`${styles.tutorialRoot} ${styles[card]}`}>
            <div className={styles.main}>
                <div className={styles.name}>
                    {cards[card].name}
                </div>
                <div className={styles.description}>
                    {cards[card].description}
                </div>
                <div
                    className={styles.next}
                    onClick={() => tutorialModel.events.setTutorial(cards[card].next)}
                >
                    <div>
                        {cards[card].next ? 'Далее' : 'Понятно!'}
                    </div>
                </div>

            </div>

        </div>
    )
}