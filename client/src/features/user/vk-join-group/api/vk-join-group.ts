import bridge from "@vkontakte/vk-bridge";

export const vkJoinGroup = async () => {
    await bridge.send("VKWebAppJoinGroup", { "group_id": 223383803 })
        .then(data => {
            if (data.result) {
            } else {
            }
        })
        .catch(() => {
        });
}