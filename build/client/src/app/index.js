"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("app/assets/styles/leaflet.css");
require("app/assets/styles/App.scss");
const canvas_1 = __importDefault(require("shared/ui/canvas"));
const load_fonts_1 = __importDefault(require("shared/ui/load-fonts"));
const ui_1 = require("shared/ui/snackbar/ui");
const useApp_1 = require("./hooks/useApp");
const map_1 = require("pages/map");
const extraction_1 = require("pages/extraction");
const ui_2 = require("shared/ui/notice/ui");
const ui_3 = require("pages/gun-shop/ui");
const page_root_1 = require("shared/ui/page-root");
const go_back_1 = require("processes/go-back");
const get_platform_native_1 = require("shared/lib/get-platform-native");
const ui_4 = require("shared/ui/tutorial/ui");
const ui_5 = require("shared/ui/load-app/ui");
const rating_1 = require("pages/rating");
const map_satellite_1 = require("pages/map-satellite");
const model_1 = require("widgets/map-region/container/model");
const model_2 = require("features/user/vk-join-group/model");
const zone_1 = require("pages/zone");
const model_3 = require("features/sector/set-zone-color/model");
const select_zone_1 = require("features/user/select-zone");
const abduction_1 = require("pages/abduction");
const popouts_1 = require("widgets/app/popouts");
(0, model_1.mapStartPosition)();
(0, model_3.setMyZoneColorStartSample)();
(0, select_zone_1.initSelectZoneSample)();
(0, model_2.initVkJoinGroup)();
window.addEventListener('popstate', () => (0, go_back_1.goBack)());
const _platform = (0, get_platform_native_1.getPlatformNative)();
const App = () => {
    console.log('App');
    console.log('Version 1.2.3');
    const page = page_root_1.pageModel.selectors.usePage().data;
    const { zoneId, socketStatus } = (0, useApp_1.useApp)();
    return (<div className={`app ${_platform}`}>

      <load_fonts_1.default fontFamily='Lolita'/>

      <popouts_1.Popouts />

      <canvas_1.default width={54} height={70}/>

      <ui_1.Snackbar />

      <ui_2.Notice />

      <ui_4.Tutorial />

      {!zoneId && <ui_5.LoadApp />}

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
            <ui_3.GunShopPage />
          </page_root_1.Page>

          <page_root_1.Page key="rating" id='rating'>
            <rating_1.RatingPage />
          </page_root_1.Page>

          <page_root_1.Page key="zone" id='zone'>
            <zone_1.ZonePage />
          </page_root_1.Page>

          <page_root_1.Page key="abduction" id='abduction'>
            <abduction_1.AbductionPage />
          </page_root_1.Page>


        </page_root_1.PageRoot>) : null}

    </div>);
};
exports.default = App;
