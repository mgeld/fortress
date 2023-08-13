import { userModel } from "entities/user"
import { FC } from "react"
import Drone from "entities/pointer/ui/drone"
// import { Fort } from "entities/fort"

type UserDroneProps = {
    size: number
}

const UserDrone: FC<UserDroneProps> = ({ size }) => {

    const { pos, health } = userModel.selectors.useUser()

    return (
        <Drone
            health={health}
            pos={pos}
            size={size}
        />
    )


}

export { UserDrone }