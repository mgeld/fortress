import { userModel } from "entities/user"
import { FC } from "react"
import { Ship } from "entities/pointer/ui/drone"
import { shipModel } from "entities/ship"
// import { Fort } from "entities/fort"

type UserDroneProps = {
    size: number
}

const UserDrone: FC<UserDroneProps> = ({ size }) => {

    const pos = shipModel.selectors.useShipPos()
    const health = shipModel.selectors.useShipHealth()

    return (
        <Ship
            health={health}
            pos={pos}
            size={size}
        />
    )


}

export { UserDrone }