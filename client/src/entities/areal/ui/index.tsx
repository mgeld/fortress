import { userModel } from "entities/user"
import { FC, useEffect } from "react"
import { Rectangle, useMap } from "react-leaflet"
import { Areal } from "../model"

// type TArealProps = {
//     bounds: [TLatLng, TLatLng]
// }
// const ArealRectangle: FC<TArealProps> = ({ bounds }) => {

const ArealRectangle: FC = () => {
    const { pos } = userModel.selectors.useUser()

    const map = useMap()

    const areal = userModel.selectors.useAreal()

    useEffect(() => {

        console.log('useEffect areal', areal)
        if (areal) {
            map.setMaxBounds(areal)
            map.setMinZoom(15)
        }

    }, [map, areal])

    if (!pos || !areal) return null

    console.log('---- AREAL', areal)

    return (
        <Rectangle
            bounds={[
                [areal[0][0] - 0.002, areal[0][1] - 0.002],
                [areal[1][0] + 0.002, areal[1][1] + 0.002],
            ]}
            pathOptions={{
                color: 'black',
                fillOpacity: 0,
                opacity: 0.4,
                weight: 50,
            }}
            weight={1}
        />
    )
}

export { ArealRectangle }