import { userModel } from "entities/user"
import { FC, useEffect } from "react"
import { Rectangle, useMap } from "react-leaflet"

// type TArealProps = {
//     bounds: [TLatLng, TLatLng]
// }
// const ArealRectangle: FC<TArealProps> = ({ bounds }) => {

const ArealRectangle: FC = () => {
    // const { pos } = userModel.selectors.useUser()

    // const map = useMap()

    const areal = userModel.selectors.useAreal()

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