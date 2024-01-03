import { createStore } from "effector"
import { useStore } from "effector-react"
import { battleAPI } from "shared/api/events"

const useBattleShareId = () => useStore($battleId)

const { setBattleShareId } = battleAPI.events

export const $battleId = createStore<string | null>(null)
    .on(setBattleShareId, (_, alert) => alert)

export const selectors = {
    useBattleShareId,
}