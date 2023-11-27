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

import { TExtrTypes } from "@ctypes/model";


export const modules: Record<TExtrTypes, {
    name: string
    icon: (width: number, height: number) => ReactNode
    feature_name: string
    feature_amount: number
    description: string
}> = {
    10: {
        name: 'Модуль ОЗ-1',
        icon: (width: number, height: number) => <IconExpRank1 width={width} height={height} />,
        feature_name: 'Опыт завоеваний',
        feature_amount: 80,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 80 очков.',
    },
    11: {
        name: 'Модуль ОЗ-2',
        icon: (width: number, height: number) => <IconExpRank2 width={width} height={height} />,
        feature_name: 'Опыт завоеваний',
        feature_amount: 100,
        description: 'Модуль опыта повышает общий опыт завоеваний на 100 очков.',
    },
    12: {
        name: 'Модуль ОЗ-3',
        icon: (width: number, height: number) => <IconExpRank3 width={width} height={height} />,
        feature_name: 'Опыт завоеваний',
        feature_amount: 150,
        description: 'Модуль опыта повышает общий опыт завоеваний на 150 очков.',
    },
    20: {
        name: 'Модуль ШС-1',
        icon: (width: number, height: number) => <IconPowerStorm1 width={width} height={height} />,
        feature_name: 'Сила штурмовиков',
        feature_amount: 3,
        description: 'Модуль силы улучшает характеристику штурмовиков, увеличивая тем самым вероятность победы в сражениях за форты',
    },
    21: {
        name: 'Модуль ШС-2',
        icon: (width: number, height: number) => <IconPowerStorm2 width={width} height={height} />,
        feature_name: 'Сила штурмовиков',
        feature_amount: 6,
        description: 'Модуль силы улучшает характеристику штурмовиков, увеличивая тем самым вероятность победы в сражениях за форты',
    },
    22: {
        name: 'Модуль ШС-3',
        icon: (width: number, height: number) => <IconPowerStorm3 width={width} height={height} />,
        feature_name: 'Сила штурмовиков',
        feature_amount: 10,
        description: 'Модуль силы улучшает характеристику штурмовиков, увеличивая тем самым вероятность победы в сражениях за форты',
    },
    30: {
        name: 'Модуль ЗК-1',
        icon: (width: number, height: number) => <IconHealthShip1 width={width} height={height} />,
        feature_name: 'Здоровье',
        feature_amount: 50,
        description: 'Модуль состояния увеличивает здоровье корабля, усиливая тем самым возможность бесперебойных завоеваний',
    },
    31: {
        name: 'Модуль ЗК-2',
        icon: (width: number, height: number) => <IconHealthShip2 width={width} height={height} />,
        feature_name: 'Здоровье',
        feature_amount: 100,
        description: 'Модуль состояния увеличивает здоровье корабля, усиливая тем самым возможность бесперебойных завоеваний',
    },
    32: {
        name: 'Модуль ЗК-3',
        icon: (width: number, height: number) => <IconHealthShip3 width={width} height={height} />,
        feature_name: 'Здоровье',
        feature_amount: 150,
        description: 'Модуль состояния увеличивает здоровье корабля, усиливая тем самым возможность бесперебойных завоеваний.',
    },
    40: {
        name: 'Модуль МЗ-1',
        icon: (width: number, height: number) => <IconPowerGun1 width={width} height={height} />,
        feature_name: 'Пушка',
        feature_amount: 3,
        description: 'Модуль мощности улучшает характеристику пушки, увеличивая тем самым наносимый урон.',
    },
    41: {
        name: 'Модуль МЗ-2',
        icon: (width: number, height: number) => <IconPowerGun2 width={width} height={height} />,
        feature_name: 'Пушка',
        feature_amount: 6,
        description: 'Модуль мощности улучшает характеристику пушки, увеличивая тем самым наносимый урон.',
    },
    42: {
        name: 'Модуль МЗ-3',
        icon: (width: number, height: number) => <IconPowerGun3 width={width} height={height} />,
        feature_name: 'Пушка',
        feature_amount: 9,
        description: 'Модуль мощности улучшает характеристику пушки, увеличивая тем самым наносимый урон.',
    },
    50: {
        name: 'Модуль ДЗ-1',
        icon: (width: number, height: number) => <IconDistGun1 width={width} height={height} />,
        feature_name: 'Пушка',
        feature_amount: 15,
        description: 'Модуль дальности увеличивает дистанцию поражения вражеских кораблей.',
    },
    51: {
        name: 'Модуль ДЗ-2',
        icon: (width: number, height: number) => <IconDistGun2 width={width} height={height} />,
        feature_name: 'Пушка',
        feature_amount: 20,
        description: 'Модуль дальности увеличивает дистанцию поражения вражеских кораблей.',
    },
    52: {
        name: 'Модуль ДЗ-3',
        icon: (width: number, height: number) => <IconDistGun3 width={width} height={height} />,
        feature_name: 'Пушка',
        feature_amount: 25,
        description: 'Модуль дальности увеличивает дистанцию поражения вражеских кораблей.',
    },
    100: {
        name: 'Группа штурма',
        icon: (width: number, height: number) => <IconStorm1 width={width} height={height} />,
        feature_name: 'Штурмовики',
        feature_amount: 100,
        description: 'Группа состоит из 100 штурмовиков.',
    },
    101: {
        name: 'Эскадрон штурма',
        icon: (width: number, height: number) => <IconStorm2 width={width} height={height} />,
        feature_name: 'Штурмовики',
        feature_amount: 150,
        description: 'Эскадрон состоит из 150 штурмовиков.',
    },
    110: {
        name: 'Сиреневый камень',
        icon: (width: number, height: number) => <IconLavenderStone width={width} height={height} />,
        feature_name: 'Кристаллы',
        feature_amount: 10,
        description: 'Сиреневый камень после активации дает 10 кристаллов.',
    },
    111: {
        name: 'Сиреневый слиток',
        icon: (width: number, height: number) => <IconLavenderIngot width={width} height={height} />,
        feature_name: 'Кристаллы',
        feature_amount: 20,
        description: 'Сиреневый слиток после активации дает 20 кристаллов.',
    },
    120: {
        name: 'Золотой камень',
        icon: (width: number, height: number) => <IconGoldStone width={width} height={height} />,
        feature_name: 'Монеты',
        feature_amount: 260,
        description: 'Золотой камень после активации дает 260 монет.',
    },
    121: {
        name: 'Слиток золота',
        icon: (width: number, height: number) => <IconGoldBar width={width} height={height} />,
        feature_name: 'Монеты',
        feature_amount: 340,
        description: 'Слиток золота после активации дает 340 монет.',
    },

}