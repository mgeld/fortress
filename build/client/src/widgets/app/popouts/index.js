"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popouts = void 0;
require("app/assets/styles/leaflet.css");
require("app/assets/styles/App.scss");
const popout_root_1 = require("shared/ui/popout-root");
const popout_1 = require("shared/ui/popout");
const battle_pending_1 = require("entities/arena/ui/battle-pending");
const user_dead_1 = require("entities/user/ui/user-dead");
const popout_2 = require("features/user/select-place/ui/popout");
const arena_1 = require("entities/arena");
const ui_1 = require("entities/ship/ui");
const ui_2 = require("entities/storm-corps/ui");
const ui_3 = require("entities/weapon/ui");
const ui_4 = require("features/weapon/gun-improve-distance/ui");
const ui_5 = require("features/weapon/gun-improve-power/ui");
const ui_6 = require("widgets/panel/ui");
const ui_7 = require("features/unit/use-extraction/ui");
const ui_8 = require("features/unit/buy-unit/ui");
const ui_9 = require("features/storm-corps/storm-add-invaders/ui");
const ui_10 = require("features/storm-corps/storm-improve-power/ui");
const ui_11 = require("features/ship/ship-improve-health/ui");
const hold_1 = require("entities/hold/ui/hold");
const ui_12 = require("features/ship/ship-level-up/ui");
const ui_13 = require("features/weapon/gun-level-up/ui");
const ui_14 = require("features/storm-corps/storm-level-up/ui");
const ui_15 = require("features/hold/hold-level-up/ui");
const alert_1 = require("shared/ui/alert");
const lock_screen_1 = require("shared/ui/lock-screen");
const vk_join_group_1 = require("features/user/vk-join-group");
const ui_16 = __importDefault(require("features/user/edit/ui"));
const abduction_1 = require("entities/user/ui/abduction");
const abduction_2 = require("widgets/primes/abduction");
const ui_17 = require("features/user/abduction-link/ui");
const ui_18 = require("features/battle/battle-connect/ui");
const battle_link_1 = require("features/battle/battle-link");
const Popouts = () => {
    const popout = popout_root_1.popoutModel.selectors.usePopout().data;
    return (<popout_root_1.PopoutRoot activePopout={popout}>

            <popout_1.Popout key='abduction' id='abduction' fill='white' screen='full' close={false} edge={0}>
                <abduction_1.Abduction />
            </popout_1.Popout>

            <popout_1.Popout key='abduction-link' id='abduction-link' fill='white' screen='full' close={false} edge={0}>
                <ui_17.AbductionLink />
            </popout_1.Popout>

            <popout_1.Popout key='battle-pending' id='battle-pending' fill='white' screen='full' close={false} edge={0}>
                <battle_pending_1.BattlePending />
            </popout_1.Popout>

            <popout_1.Popout key='battle-over' id='battle-over' fill='#5a166480' screen='full' close={false} edge={0}>
                <arena_1.BattleOver />
            </popout_1.Popout>

            <popout_1.Popout key='battle-connect' id='battle-connect' fill='#5a166480' edge={12}>
                <ui_18.BattleConnect />
            </popout_1.Popout>

            <popout_1.Popout key='battle-link' id='battle-link' fill='white' screen='full' close={false} edge={0}>
                <battle_link_1.BattleLink />
            </popout_1.Popout>

            <popout_1.Popout key='vk-join-group' id='vk-join-group' fill='white' screen='full' close={true} edge={0}>
                <vk_join_group_1.VkJoinGroup />
            </popout_1.Popout>

            <popout_1.Popout key='user-dead' id='user-dead' fill='#5a166480' edge={12}>
                <user_dead_1.UserDead />
            </popout_1.Popout>

            <popout_1.Popout key='zone-edit' id='zone-edit' fill='#5a166480' edge={12}>
                <ui_16.default />
            </popout_1.Popout>

            <popout_1.Popout key='select-place' id='select-place' fill='#5a166480' close={false} edge={24}>
                <popout_2.SelectPlace />
            </popout_1.Popout>

            <popout_1.Popout key='select-extraction' id='select-extraction' fill='#5a166480' edge={28}>
                <ui_7.ExtractionPopout />
            </popout_1.Popout>

            <popout_1.Popout key='ship' id='ship' fill='#5a166480' edge={14}>
                <ui_1.ShipPopout />
            </popout_1.Popout>

            <popout_1.Popout key='storm-corps' id='storm-corps' fill='#5a166480' edge={14}>
                <ui_2.StormCorpsPopout />
            </popout_1.Popout>

            <popout_1.Popout key='gun' id='gun' fill='#5a166480' edge={14}>
                <ui_3.GunPopout />
            </popout_1.Popout>

            <popout_1.Popout key='hold' id='hold' fill='#5a166480' edge={14}>
                <hold_1.HoldPopout />
            </popout_1.Popout>

            
            <popout_1.Popout key='gun-improve-distance' id='gun-improve-distance' fill='#5a166480' edge={14}>
                <ui_4.GunImproveDistance />
            </popout_1.Popout>

            <popout_1.Popout key='gun-improve-power' id='gun-improve-power' fill='#5a166480' edge={14}>
                <ui_5.GunImprovePower />
            </popout_1.Popout>

            <popout_1.Popout key='storm-add-invaders' id='storm-add-invaders' fill='#5a166480' edge={14}>
                <ui_9.StormAddInvaders />
            </popout_1.Popout>

            <popout_1.Popout key='storm-improve-power' id='storm-improve-power' fill='#5a166480' edge={14}>
                <ui_10.StormImprovePower />
            </popout_1.Popout>

            <popout_1.Popout key='ship-improve-health' id='ship-improve-health' fill='#5a166480' edge={14}>
                <ui_11.ShipImproveHealth />
            </popout_1.Popout>

            

            <popout_1.Popout key='ship-level-up' id='ship-level-up' fill='#5a166480' edge={14}>
                <ui_12.ShipLevelUp />
            </popout_1.Popout>

            <popout_1.Popout key='gun-level-up' id='gun-level-up' fill='#5a166480' edge={14}>
                <ui_13.GunLevelUp />
            </popout_1.Popout>

            <popout_1.Popout key='storm-level-up' id='storm-level-up' fill='#5a166480' edge={14}>
                <ui_14.StormLevelUp />
            </popout_1.Popout>

            <popout_1.Popout key='hold-level-up' id='hold-level-up' fill='#5a166480' edge={14}>
                <ui_15.HoldLevelUp />
            </popout_1.Popout>

            <popout_1.Popout key='panel' id='panel' fill='#5a166480' edge={14}>
                <ui_6.Panel />
            </popout_1.Popout>

            <popout_1.Popout key='select-unit' id='select-unit' fill='#5a166480' edge={28}>
                <ui_8.BuyUnit />
            </popout_1.Popout>

            <popout_1.Popout key='alert' id='alert' fill='#5a166480' edge={28}>
                <alert_1.Alert />
            </popout_1.Popout>

            <popout_1.Popout key='lock-screen' id='lock-screen' fill='#5a166480' edge={14} close={false}>
                <lock_screen_1.LockScreen />
            </popout_1.Popout>

            <popout_1.Popout key='abduction-primes' id='abduction-primes' fill='#5a166480' edge={12} close={false}>
                <abduction_2.AbductionPrimes />
            </popout_1.Popout>

        </popout_root_1.PopoutRoot>);
};
exports.Popouts = Popouts;
