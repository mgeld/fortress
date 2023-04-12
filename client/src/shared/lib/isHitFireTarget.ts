import { TJoystickDirection, TLatLng } from "shared/types"

export type TPoint = {
    from: TLatLng
    to: TLatLng
    marker: TLatLng
    radius: number
    direction: TJoystickDirection | null
}

export const isHitFireTarget = ({
    from,
    to,
    marker,
    radius,
    direction
}: TPoint) => {

    let f_lat = from[0]
    let f_long = from[1]

    let t_lat = to[0]
    let t_long = to[1]

    let m_lat = marker[0]
    let m_long = marker[1]

    let long_start = f_long - radius
    let long_end = f_long + radius

    let lat_start = f_lat - radius
    let lat_end = f_lat + radius

    switch (direction) {
        case 'FORWARD':
            return m_long > long_start && m_long < long_end && m_lat < t_lat + radius && m_lat > f_lat
        case 'BACKWARD':
            return m_long > long_start && m_long < long_end && m_lat > t_lat - radius && m_lat < f_lat
        case 'LEFT':
            return m_lat > lat_start && m_lat < lat_end && m_long > t_long - radius && m_long < f_long
        case 'RIGHT':
            return m_lat > lat_start && m_lat < lat_end && m_long < t_long + radius && m_long > f_long
        default:
            return false
    }
}