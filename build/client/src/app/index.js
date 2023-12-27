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
const page_root_1 = require("shared/ui/page-root");
const ui_15 = require("features/ship/ship-level-up/ui");
const ui_16 = require("features/weapon/gun-level-up/ui");
const ui_17 = require("features/storm-corps/storm-level-up/ui");
const ui_18 = require("features/hold/hold-level-up/ui");
const go_back_1 = require("processes/go-back");
const get_platform_native_1 = require("shared/lib/get-platform-native");
const alert_1 = require("shared/ui/alert");
const ui_19 = require("shared/ui/tutorial/ui");
const lock_screen_1 = require("shared/ui/lock-screen");
const ui_20 = require("shared/ui/load-app/ui");
const rating_1 = require("pages/rating");
const map_satellite_1 = require("pages/map-satellite");
const model_1 = require("widgets/map-region/container/model");
const vk_join_group_1 = require("features/user/vk-join-group");
const model_2 = require("features/user/vk-join-group/model");
const zone_1 = require("pages/zone");
const model_3 = require("features/sector/set-zone-color/model");
const select_zone_1 = require("features/user/select-zone");
const ui_21 = __importDefault(require("features/user/edit/ui"));
const abduction_1 = require("entities/user/ui/abduction");
const abduction_2 = require("widgets/primes/abduction");
const abduction_3 = require("pages/abduction");
const ui_22 = require("features/user/abduction-link/ui");
(0, model_1.mapStartPosition)();
(0, model_3.setMyZoneColorStartSample)();
(0, select_zone_1.initSelectZoneSample)();
(0, model_2.initVkJoinGroup)();
window.addEventListener('popstate', () => (0, go_back_1.goBack)());
const _platform = (0, get_platform_native_1.getPlatformNative)();
const App = () => {
    console.log('App');
    console.log('Version 1.2.1');
    const popout = popout_root_1.popoutModel.selectors.usePopout().data;
    const page = page_root_1.pageModel.selectors.usePage().data;
    const { zoneId, socketStatus } = (0, useApp_1.useApp)();
    return (<div className={`app ${_platform}`}>

      <load_fonts_1.default fontFamily='Lolita'/>

      <popout_root_1.PopoutRoot activePopout={popout}>

        

        <popout_1.Popout key='abduction' id='abduction' fill='white' screen='full' close={false} edge={0}>
          <abduction_1.Abduction />
        </popout_1.Popout>
        
        <popout_1.Popout key='abduction-link' id='abduction-link' fill='white' screen='full' close={false} edge={0}>
          <ui_22.AbductionLink />
        </popout_1.Popout>

        <popout_1.Popout key='battle-pending' id='battle-pending' fill='white' screen='full' close={false} edge={0}>
          <battle_pending_1.BattlePending />
        </popout_1.Popout>

        <popout_1.Popout key='battle-over' id='battle-over' fill='#5a166480' screen='full' close={false} edge={0}>
          <arena_1.BattleOver />
        </popout_1.Popout>

        <popout_1.Popout key='vk-join-group' id='vk-join-group' fill='white' screen='full' close={true} edge={0}>
          <vk_join_group_1.VkJoinGroup />
        </popout_1.Popout>

        <popout_1.Popout key='user-dead' id='user-dead' fill='#5a166480' edge={12}>
          <user_dead_1.UserDead />
        </popout_1.Popout>

        <popout_1.Popout key='zone-edit' id='zone-edit' fill='#5a166480' edge={12}>
          <ui_21.default />
        </popout_1.Popout>

        <popout_1.Popout key='select-place' id='select-place' fill='#5a166480' close={false} edge={12}>
          <popout_2.SelectPlace />
        </popout_1.Popout>

        <popout_1.Popout key='select-extraction' id='select-extraction' fill='#5a166480' edge={28}>
          <ui_9.ExtractionPopout />
        </popout_1.Popout>

        <popout_1.Popout key='ship' id='ship' fill='#5a166480' edge={14}>
          <ui_3.ShipPopout />
        </popout_1.Popout>

        <popout_1.Popout key='storm-corps' id='storm-corps' fill='#5a166480' edge={14}>
          <ui_4.StormCorpsPopout />
        </popout_1.Popout>

        <popout_1.Popout key='gun' id='gun' fill='#5a166480' edge={14}>
          <ui_5.GunPopout />
        </popout_1.Popout>

        <popout_1.Popout key='hold' id='hold' fill='#5a166480' edge={14}>
          <hold_1.HoldPopout />
        </popout_1.Popout>

        
        <popout_1.Popout key='gun-improve-distance' id='gun-improve-distance' fill='#5a166480' edge={14}>
          <ui_6.GunImproveDistance />
        </popout_1.Popout>

        <popout_1.Popout key='gun-improve-power' id='gun-improve-power' fill='#5a166480' edge={14}>
          <ui_7.GunImprovePower />
        </popout_1.Popout>

        <popout_1.Popout key='storm-add-invaders' id='storm-add-invaders' fill='#5a166480' edge={14}>
          <ui_12.StormAddInvaders />
        </popout_1.Popout>

        <popout_1.Popout key='storm-improve-power' id='storm-improve-power' fill='#5a166480' edge={14}>
          <ui_13.StormImprovePower />
        </popout_1.Popout>

        <popout_1.Popout key='ship-improve-health' id='ship-improve-health' fill='#5a166480' edge={14}>
          <ui_14.ShipImproveHealth />
        </popout_1.Popout>

        

        <popout_1.Popout key='ship-level-up' id='ship-level-up' fill='#5a166480' edge={14}>
          <ui_15.ShipLevelUp />
        </popout_1.Popout>

        <popout_1.Popout key='gun-level-up' id='gun-level-up' fill='#5a166480' edge={14}>
          <ui_16.GunLevelUp />
        </popout_1.Popout>

        <popout_1.Popout key='storm-level-up' id='storm-level-up' fill='#5a166480' edge={14}>
          <ui_17.StormLevelUp />
        </popout_1.Popout>

        <popout_1.Popout key='hold-level-up' id='hold-level-up' fill='#5a166480' edge={14}>
          <ui_18.HoldLevelUp />
        </popout_1.Popout>

        <popout_1.Popout key='panel' id='panel' fill='#5a166480' edge={14}>
          <ui_8.Panel />
        </popout_1.Popout>

        <popout_1.Popout key='select-unit' id='select-unit' fill='#5a166480' edge={28}>
          <ui_11.BuyUnit />
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

      </popout_root_1.PopoutRoot>

      <canvas_1.default width={54} height={70}/>

      <ui_1.Snackbar />

      <ui_2.Notice />

      <ui_19.Tutorial />

      {!zoneId && <ui_20.LoadApp />}

      {socketStatus ? (<page_root_1.PageRoot activePage={page}>

          <page_root_1.Page key="map" id='map'>
            <map_1.MapPage />
          </page_root_1.Page>

          <page_root_1.Page key="map-satellite" id='map-satellite'>
            <map_satellite_1.MapSatellitPage />
          </page_root_1.Page>

          <page_root_1.Page key="extraction" id='extraction'>
            <extraction_1.ExtractionPage />
          </page_root_1.Page>

          <page_root_1.Page key="shop" id='gun-shop'>
            <ui_10.GunShopPage />
          </page_root_1.Page>

          <page_root_1.Page key="rating" id='rating'>
            <rating_1.RatingPage />
          </page_root_1.Page>

          <page_root_1.Page key="zone" id='zone'>
            <zone_1.ZonePage />
          </page_root_1.Page>

          <page_root_1.Page key="abduction" id='abduction'>
            <abduction_3.AbductionPage />
          </page_root_1.Page>


        </page_root_1.PageRoot>) : null}

    </div>);
};
exports.default = App;
