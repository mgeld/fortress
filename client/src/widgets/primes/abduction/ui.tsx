import { FC, useState } from "react";

import { Prime } from "shared/ui/prime";
import { mapAPI } from "shared/api/events";
import { popoutModel } from "shared/ui/popout-root";
import { IconShip } from "widgets/panel/assets/icons";
import { IconStorm2 } from "entities/unit/icons/_icons";
import { IconAlien, IconShipBeam, IconUFO } from "shared/assets/icons/_icons";

import styles from './styles.module.scss'

export const AbductionPrimes: FC = () => {
    const [card, setCard] = useState(1)

    const cards = [
        {
            id: 1,
            name: "Похищение",
            icon: <IconShipBeam width={76} height={76} />,
            message: "Вы просыпаетесь в странном месте — на борту гигантского летающего корабля. Вы не знаете, как здесь оказались. Последнее, что вы помните — это странный свет, который охватил вас и понес в небо.",
        },
        {
            id: 2,
            name: "Сон... или реальность?",
            icon: <IconAlien width={68} height={68} />,
            message: "Когда вы приходите в себя, вам предстоит столкнуться с необъяснимым: вы больше не человек, а один из пришельцев. Опыты прищельцев были успешными.",
        },
        {
            id: 3,
            name: "Вы справитесь!",
            icon: <IconShip width={78} height={78} />,
            message: "Вы пока не знаете, что теперь ждет вас, но вы готовы к этому, ведь теперь у вас есть собственный летающий корабль!",
        },
        {
            id: 4,
            name: "Начало экспансии",
            icon: <IconStorm2 width={72} height={72} />,
            message: "В роли пришельца вам предстоит завоевать эту планету! Теперь вы — командир армии штурмовиков, и ваша задача — взять под контроль все форты (башни), разбросанные по всей земле.",
        },
        {
            id: 5,
            name: "Победить сильнейший!",
            icon: <IconUFO width={74} height={74} />,
            message: "Будьте готовы к неожиданным атакам и подлым трюкам ваших врагов. Защитите свои территории и покорите новые земли! Вас ждут великие завоевания и неповторимые победы!",
        },
        // {
        //     id: 4,
        //     name: "Защита корабля",
        //     icon: <IconShipGun width={74} height={74} />,
        //     message: "Для защиты от вражеских пришельцев, корабль оснащен плазменной пушкой, а для сбора необходимых ресурсов в корабль встроен проектор луча притяжения."
        // },
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