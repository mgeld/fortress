import { TLatLng } from "../../common-types/model";

type TMemberPlaceProps = {
    teamPlace: TLatLng
    memberIndex: number
}

class MemberPlace {
    public static generate(
        teamPlace: TLatLng,
        memberIndex: number
    ): TLatLng {
        if (memberIndex % 2 > 0) {
            return [
                teamPlace[0] + (memberIndex * 0.001),
                teamPlace[1]
            ]
        }
        return [
            teamPlace[0] - (memberIndex * 0.001),
            teamPlace[1]
        ]
    }
}
export {
    MemberPlace
}