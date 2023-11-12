"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("app/assets/styles/leaflet.css");
require("app/assets/styles/App.scss");
const canvas_1 = __importDefault(require("shared/ui/canvas"));
const load_fonts_1 = __importDefault(require("shared/ui/load-fonts"));
const popout_root_1 = require("shared/ui/popout-root");
const popout_1 = require("shared/ui/popout");
const battle_pending_1 = require("entities/arena/ui/battle-pending");
const ui_1 = require("shared/ui/snackbar/ui");
const user_dead_1 = require("entities/user/ui/user-dead");
const popout_2 = require("features/user/select-place/ui/popout");
const useApp_1 = require("./hooks/useApp");
const map_1 = require("pages/map");
const extraction_1 = require("pages/extraction");
const arena_1 = require("entities/arena");
const ui_2 = require("shared/ui/notice/ui");
const ui_3 = require("entities/ship/ui");
const ui_4 = require("entities/storm-corps/ui");
const ui_5 = require("entities/weapon/ui");
const ui_6 = require("features/weapon/gun-improve-distance/ui");
const ui_7 = require("features/weapon/gun-improve-power/ui");
const ui_8 = require("widgets/panel/ui");
const ui_9 = require("features/unit/use-extraction/ui");
const ui_10 = require("pages/gun-shop/ui");
const ui_11 = require("features/unit/buy-unit/ui");
const ui_12 = require("features/storm-corps/storm-add-invaders/ui");
const ui_13 = require("features/storm-corps/storm-improve-power/ui");
const ui_14 = require("features/ship/ship-improve-health/ui");
const hold_1 = require("entities/hold/ui/hold");
const model_1 = require("widgets/map-layout/model");
const page_root_1 = require("shared/ui/page-root");
const ui_15 = require("features/ship/ship-level-up/ui");
const ui_16 = require("features/weapon/gun-level-up/ui");
const ui_17 = require("features/storm-corps/storm-level-up/ui");
const ui_18 = require("features/hold/hold-level-up/ui");
const unit_out_hold_1 = require("entities/unit/ui/unit-out-hold");
const go_back_1 = require("processes/go-back");
const primes_1 = require("widgets/primes");
const get_platform_1 = require("shared/lib/get-platform");
const get_platform_native_1 = require("shared/lib/get-platform-native");
(0, model_1.mapStartPosition)();
window.addEventListener('popstate', () => (0, go_back_1.goBack)());
let platform = (0, get_platform_1.getPlatform)();
const _platform = (0, get_platform_native_1.getPlatformNative)();
const App = () => {
    console.log('platform', platform);
    console.log('_platform', _platform);
    console.log('Version 0.4');
    const popout = popout_root_1.popoutModel.selectors.usePopout().data;
    const page = page_root_1.pageModel.selectors.usePage().data;
    console.log('App');
    const { vkUserId, socketStatus } = (0, useApp_1.useApp)();
    if (!vkUserId)
        return <>load...</>;
    return (<div className={`app ${_platform}`}>

      <popout_root_1.PopoutRoot activePopout={popout}>

        <popout_1.Popout id='battle-pending' fill='#5a166480' close={false}>
          <battle_pending_1.BattlePending />
        </popout_1.Popout>

        <popout_1.Popout id='battle-over' fill='#5a166480' close={false}>
          <arena_1.BattleOver />
        </popout_1.Popout>

        <popout_1.Popout id='user-dead' fill='#5a166480'>
          <user_dead_1.UserDead />
        </popout_1.Popout>

        <popout_1.Popout id='select-place' fill='#5a166480' close={false}>
          <popout_2.SelectPlace />
        </popout_1.Popout>

        <popout_1.Popout id='select-extraction' fill='#5a166480' edge={28}>
          <ui_9.ExtractionPopout />
        </popout_1.Popout>

        <popout_1.Popout id='ship' fill='#5a166480' edge={14}>
          <ui_3.ShipPopout />
        </popout_1.Popout>

        <popout_1.Popout id='storm-corps' fill='#5a166480' edge={14}>
          <ui_4.StormCorpsPopout />
        </popout_1.Popout>

        <popout_1.Popout id='gun' fill='#5a166480' edge={14}>
          <ui_5.GunPopout />
        </popout_1.Popout>

        <popout_1.Popout id='hold' fill='#5a166480' edge={14}>
          <hold_1.HoldPopout />
        </popout_1.Popout>

        <popout_1.Popout id='gun-improve-distance' fill='#5a166480' edge={14}>
          <ui_6.GunImproveDistance />
        </popout_1.Popout>

        <popout_1.Popout id='gun-improve-power' fill='#5a166480' edge={14}>
          <ui_7.GunImprovePower />
        </popout_1.Popout>

        <popout_1.Popout id='storm-add-invaders' fill='#5a166480' edge={14}>
          <ui_12.StormAddInvaders />
        </popout_1.Popout>

        <popout_1.Popout id='storm-improve-power' fill='#5a166480' edge={14}>
          <ui_13.StormImprovePower />
        </popout_1.Popout>

        <popout_1.Popout id='ship-improve-health' fill='#5a166480' edge={14}>
          <ui_14.ShipImproveHealth />
        </popout_1.Popout>

        <popout_1.Popout id='ship-level-up' fill='#5a166480' edge={14}>
          <ui_15.ShipLevelUp />
        </popout_1.Popout>

        <popout_1.Popout id='gun-level-up' fill='#5a166480' edge={14}>
          <ui_16.GunLevelUp />
        </popout_1.Popout>

        <popout_1.Popout id='storm-level-up' fill='#5a166480' edge={14}>
          <ui_17.StormLevelUp />
        </popout_1.Popout>


        <popout_1.Popout id='hold-level-up' fill='#5a166480' edge={14}>
          <ui_18.HoldLevelUp />
        </popout_1.Popout>

        <popout_1.Popout id='panel' fill='#5a166480' edge={14}>
          <ui_8.Panel />
        </popout_1.Popout>

        <popout_1.Popout id='select-unit' fill='#5a166480' edge={28}>
          <ui_11.BuyUnit />
        </popout_1.Popout>

        <popout_1.Popout id='unit-out-hold' fill='#5a166480' edge={28}>
          <unit_out_hold_1.UnitOutHold />
        </popout_1.Popout>

        <popout_1.Popout id='primes' fill='#5a166480' edge={12}>
          <primes_1.Primes />
        </popout_1.Popout>

      </popout_root_1.PopoutRoot>

      <load_fonts_1.default fontFamily='Lolita'/>

      <canvas_1.default width={54} height={70}/>

      <ui_1.Snackbar />
      <ui_2.Notice />

      {socketStatus ? (<page_root_1.PageRoot activePage={page}>
          
          <page_root_1.Page id='map'>
            <map_1.MapPage />
          </page_root_1.Page>

          <page_root_1.Page id='extraction'>
            <extraction_1.ExtractionPage />
          </page_root_1.Page>

          <page_root_1.Page id='gun-shop'>
            <ui_10.GunShopPage />
          </page_root_1.Page>

        </page_root_1.PageRoot>) : null}

    </div>);
};
exports.default = App;
