import { FC } from "react";
import { IconSapphire } from "shared/assets/icons/_icons";
import { popoutModel } from "shared/ui/popout-root";
import { VioletScreen } from "shared/ui/violet-screen";
import { vkAllowMessages } from "./api/vk-allow-msg";
import { vkJoinGroup } from "./api/vk-join-group";

export const VkJoinGroup: FC = () => {
    return (
        <VioletScreen
            name="Новости игры"
            icon={<IconSapphire width={60} height={60} />}
            message="Подпишитесь на сообщество, чтобы быть в курсе новых событий в игре. В награду вы получите 50 кристаллов!"
            action={{
                text: 'Подписаться',
                _click: async () => {
                    popoutModel.events.setPopout(null)
                    await vkAllowMessages()
                    vkJoinGroup()
                }
            }}
        />
    )
}