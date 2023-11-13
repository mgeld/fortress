import { FC, useState } from "react";

import { Prime } from "shared/ui/prime";
import { IconShip } from "widgets/panel/assets/icons";
import { popoutModel } from "shared/ui/popout-root";
import { mapAPI } from "shared/api/events";
import { IconShipGun } from "shared/assets/icons/_icons";
import { IconStorm2 } from "entities/unit/icons/_icons";

import styles from './styles.module.scss'

export const Primes: FC = () => {
    const [card, setCard] = useState(1)

    const cards = [
        {
            id: 1,
            name: "Начало экспансии",
            icon: <IconStorm2 width={74} height={74} />,
            message: "В роли пришельца тебе предстоит завоевать планету, управляя армией штурмовиков и собирая ресурсы с башен, разбросанных по всей земле.",
        },
        {
            id: 2,
            name: "Корабль",
            icon: <IconShip width={74} height={74} />,
            message: "Для этого тебе представлен свой личный летающий корабль, на борту которой базируется корпус штурмовиков."
        },
        {
            id: 3,
            name: "Защита корабля",
            icon: <IconShipGun width={74} height={74} />,
            message: "Для защиты от вражеских пришельцев, корабль оснащен плазменной пушкой, а для сбора необходимых ресурсов в корабль встроен проектор луча притяжения."
        },
    ]

    let action = card + 1 > Object.keys(cards).length ? {
        _click: () => {
            popoutModel.events.setPopout(null)

            setTimeout(() => {
                popoutModel.events.setPopout('select-place')
                mapAPI.events.setMapMode('select-place')
            }, 500)
        },
        text: 'Начать'
    } : {
        _click: () => setCard(card + 1),
        text: 'Далее'
    }


    return (
        <div className={styles.primes}>

            {cards.map((_card) => {
                if (_card.id !== card) return <></>
                return (
                    <div className={styles.card}>
                        <Prime
                            name={_card.name}
                            icon={_card.icon}
                            message={_card.message}
                            action={action}
                        />
                    </div>
                )
            })}

            {/* <div className={styles.card}>
                <Prime
                    name=""
                    icon=""
                    message=""
                    action={{
                        _click: () => { },
                        text: 'Далее'
                    }}
                />
            </div> */}

        </div>
    )
}