import Point from "entities/pointer/ui/point"
import { userModel } from "entities/user"
import { FC } from "react"

const UserPoint: FC = () => {

    const { userId, pos, health, userIcon, userName } = userModel.selectors.useUser()

    return (
        <Point
            pointer={{
                userId,
                pos,
                health,
                userName,
                icon: userIcon
            }}
        />
    )


}

export { UserPoint }