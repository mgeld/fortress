import { shipModel } from "entities/ship"
import { LatLng, LatLngBounds } from "leaflet"
import { FC, useEffect } from "react"
import { Circle, Polygon, Rectangle, useMap } from "react-leaflet"

// type TArealProps = {
//     bounds: [TLatLng, TLatLng]
// }
// const ArealRectangle: FC<TArealProps> = ({ bounds }) => {

const ArealRectangle: FC = () => {
    // const { pos } = userModel.selectors.useUser()

    // const map = useMap()

    const areal = shipModel.selectors.useAreal()

    // useEffect(() => {
    //     if (areal) {
    //         map.setMaxBounds([
    //             [areal[0][0] - 0.01, areal[0][1] - 0.01],
    //             [areal[1][0] + 0.01, areal[1][1] + 0.01],
    //         ])
    //     }
    // }, [map, areal])

    if (!areal) return null

    return (
        <>
        {/* <Circle
            center={areal[0]}
            radius={30}
        />
        <Circle
            center={areal[1]}
            radius={30}
        />
            <Polygon
                positions={[
                    [areal[0][0], areal[0][1]],
                    [areal[0][0] + 0.02, areal[0][1]],
                    [areal[1][0], areal[1][1]],
                    [areal[0][0], areal[0][1] + 0.03],
                ]}
                pathOptions={{
                    fillColor: 'green',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            /> */}
            <Rectangle
                bounds={[
                    [areal[0][0] - 0.01, areal[0][1]],
                    [areal[1][0] + 0.01, areal[0][1] - 0.01],
                ]}
                pathOptions={{
                    fillColor: '#db5e5e',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />
            <Rectangle
                bounds={[
                    [areal[1][0], areal[0][1]],
                    [areal[1][0] + 0.01, areal[1][1]],
                ]}
                pathOptions={{
                    fillColor: '#db5e5e',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />
            <Rectangle
                bounds={[
                    [areal[0][0] - 0.01, areal[1][1]],
                    [areal[1][0] + 0.01, areal[1][1] + 0.01],
                ]}
                pathOptions={{
                    fillColor: '#db5e5e',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />
            <Rectangle
                bounds={[
                    [areal[0][0], areal[0][1]],
                    [areal[0][0] - 0.01, areal[1][1]],
                ]}
                pathOptions={{
                    fillColor: '#db5e5e',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />


            {/* <Rectangle
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
            /> */}
        </>
    )
}

export { ArealRectangle }