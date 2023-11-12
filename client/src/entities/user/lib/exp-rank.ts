
export type TRank =
| 1
| 2
| 3
| 4
| 5
| 6
| 7
| 8
| 9
| 10
| 11
| 12
| 13
| 14
| 15
| 16
| 17
| 18
| 19
| 20
| 21
| 22
| 23
| 24

export class ExpRank {
    private static _rankExpList: Record<TRank, number> = {
        1: 350,
        2: 455,
        3: 665,
        4: 980,
        5: 1400,
        6: 1925,
        7: 2555,
        8: 3290,
        9: 4130,
        10: 5075,
        11: 6125,
        12: 7280,
        13: 8540,
        14: 9905,
        15: 11375,
        16: 12950,
        17: 14630,
        18: 16415,
        19: 18305,
        20: 20300,
        21: 22400,
        22: 24605,
        23: 26915,
        24: 29330,
    }

    public static getExp(rank: TRank) {
        return ExpRank._rankExpList[rank]

    }
}