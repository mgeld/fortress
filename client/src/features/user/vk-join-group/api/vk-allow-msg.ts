import bridge from "@vkontakte/vk-bridge";

export const vkAllowMessages = async () => {
    return await bridge.send("VKWebAppAllowMessagesFromGroup", { "group_id": 223383803, "key": 'sddddaaaaaa' })
        .then(data => {
            if (data.result) {
            } else {
            }
        })
        .catch(() => {
        });
}
