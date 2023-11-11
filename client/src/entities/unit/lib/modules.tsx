import { ReactNode } from "react";
import {
    IconDistGun1,
    IconDistGun2,
    IconDistGun3,
    IconExpRank1,
    IconExpRank2,
    IconExpRank3,
    IconGoldBar,
    IconGoldStone,
    IconHealthShip1,
    IconHealthShip2,
    IconHealthShip3,
    IconLavenderIngot,
    IconLavenderStone,
    IconPowerGun1,
    IconPowerGun2,
    IconPowerGun3,
    IconPowerStorm1,
    IconPowerStorm2,
    IconPowerStorm3,
    IconStorm1,
    IconStorm2
} from "../icons/_icons";

export const modules: {
    [key: number]: {
        name: string
        icon: ReactNode
        feature_name: string
        feature_amount: number
        description: string
    }
} = {
    10: {
        name: 'Модуль ОЗ-1',
        icon: <IconExpRank1 width={66} height={66} />,
        feature_name: 'Опыт завоеваний',
        feature_amount: 100,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    11: {
        name: 'Модуль ОЗ-2',
        icon: <IconExpRank2 width={66} height={66} />,
        feature_name: 'Опыт завоеваний',
        feature_amount: 250,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    12: {
        name: 'Модуль ОЗ-3',
        icon: <IconExpRank3 width={66} height={66} />,
        feature_name: 'Опыт завоеваний',
        feature_amount: 100,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    20: {
        name: 'Модуль ШС-1',
        icon: <IconPowerStorm1 width={66} height={66} />,
        feature_name: 'Сила штурмовиков',
        feature_amount: 5,
        description: 'Модуль силы улучшает харктеристику штурмовиков, увеличивая тем самым вероятность победы в сражениях за форты\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    21: {
        name: 'Модуль ШС-2',
        icon: <IconPowerStorm2 width={66} height={66} />,
        feature_name: 'Сила штурмовиков',
        feature_amount: 10,
        description: 'Модуль силы улучшает харктеристику штурмовиков, увеличивая тем самым вероятность победы в сражениях за форты\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    22: {
        name: 'Модуль ШС-3',
        icon: <IconPowerStorm3 width={66} height={66} />,
        feature_name: 'Сила штурмовиков',
        feature_amount: 15,
        description: 'Модуль силы улучшает харктеристику штурмовиков, увеличивая тем самым вероятность победы в сражениях за форты\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    30: {
        name: 'Модуль ЗК-1',
        icon: <IconHealthShip1 width={66} height={66} />,
        feature_name: 'Здоровье',
        feature_amount: 100,
        description: 'Модуль состояния увеличивает здоровье корабля, усиливая тем самым возможность бесперебойных завоеваний.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    31: {
        name: 'Модуль ЗК-2',
        icon: <IconHealthShip2 width={66} height={66} />,
        feature_name: 'Здоровье',
        feature_amount: 100,
        description: 'Модуль состояния увеличивает здоровье корабля, усиливая тем самым возможность бесперебойных завоеваний.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    32: {
        name: 'Модуль ЗК-3',
        icon: <IconHealthShip3 width={66} height={66} />,
        feature_name: 'Здоровье',
        feature_amount: 500,
        description: 'Модуль состояния увеличивает здоровье корабля, усиливая тем самым возможность бесперебойных завоеваний.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    40: {
        name: 'Модуль МЗ-1',
        icon: <IconPowerGun1 width={66} height={66} />,
        feature_name: 'Пушка',
        feature_amount: 100,
        description: 'Модуль мощности улучшает харктеристику пушки, увеличивая тем самым наносимый урон.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    41: {
        name: 'Модуль МЗ-2',
        icon: <IconPowerGun2 width={66} height={66} />,
        feature_name: 'Пушка',
        feature_amount: 500,
        description: 'Модуль мощности улучшает харктеристику пушки, увеличивая тем самым наносимый урон.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    42: {
        name: 'Модуль МЗ-3',
        icon: <IconPowerGun3 width={66} height={66} />,
        feature_name: 'Пушка',
        feature_amount: 500,
        description: 'Модуль мощности улучшает харктеристику пушки, увеличивая тем самым наносимый урон.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    50: {
        name: 'Модуль ДЗ-1',
        icon: <IconDistGun1 width={66} height={66} />,
        feature_name: 'Пушка',
        feature_amount: 10,
        description: 'Модуль дальности увеличивает дистанцию поражения вражеских кораблей.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    51: {
        name: 'Модуль ДЗ-2',
        icon: <IconDistGun2 width={66} height={66} />,
        feature_name: 'Пушка',
        feature_amount: 20,
        description: 'Модуль дальности увеличивает дистанцию поражения вражеских кораблей.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    52: {
        name: 'Модуль ДЗ-3',
        icon: <IconDistGun3 width={66} height={66} />,
        feature_name: 'Пушка',
        feature_amount: 30,
        description: 'Модуль дальности увеличивает дистанцию поражения вражеских кораблей.\n\n' +
        'Можно находить в фортах при завоеваний территорий, а также купить в магазине.',
    },
    100: {
        name: 'Группа штурма',
        icon: <IconStorm1 width={66} height={66} />,
        feature_name: 'Штурмовики',
        feature_amount: 200,
        description: 'Группа состоит из 50 штурмовиков.',
    },
    101: {
        name: 'Эскадрон штурма',
        icon: <IconStorm2 width={66} height={66} />,
        feature_name: 'Штурмовики',
        feature_amount: 200,
        description: 'Эскадрон состоит из 150 штурмовиков.',
    },
    110: {
        name: 'Сиреневый камень',
        icon: <IconLavenderStone width={66} height={66} />,
        feature_name: 'Кристаллы',
        feature_amount: 50,
        description: 'Эскадрон состоит из 150 штурмовиков.',
    },
    111: {
        name: 'Сиреневый слиток',
        icon: <IconLavenderIngot width={66} height={66} />,
        feature_name: 'Кристаллы',
        feature_amount: 80,
        description: 'Эскадрон состоит из 150 штурмовиков.',
    },
    120: {
        name: 'Золотой камень',
        icon: <IconGoldStone width={66} height={66} />,
        feature_name: 'Монеты',
        feature_amount: 80,
        description: 'Эскадрон состоит из 150 штурмовиков.',
    },
    121: {
        name: 'Слиток золота',
        icon: <IconGoldBar width={66} height={66} />,
        feature_name: 'Монеты',
        feature_amount: 80,
        description: 'Эскадрон состоит из 150 штурмовиков.',
    },

}