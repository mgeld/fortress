"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPage = void 0;
const map_bottom_1 = require("widgets/map-bottom");
const map_buttons_1 = require("widgets/map-buttons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const battle_counters_1 = require("widgets/battle-counters");
const battle_type_1 = require("entities/arena/ui/battle-type");
const map_rang_1 = require("entities/user/ui/map-rang");
const counters_1 = require("widgets/counters/counters");
const map_layout_1 = __importDefault(require("widgets/map-layout/ui/map-layout"));
const timer_1 = require("entities/arena/ui/timer");
const map_1 = require("entities/map");
const MapPage = () => {
    const mode = map_1.mapModel.selectors.useMapMode().mode;
    return (<div className={styles_module_scss_1.default.mapPage}>
            <div className={styles_module_scss_1.default.__page}>

                {mode === 'invade' ? (<>
                        <map_buttons_1.MapButtons />
                        <map_rang_1.MapRang />
                        <counters_1.Counters />
                    </>) :
            mode === 'battle' ? (<>
                            <timer_1.Timer />
                            <battle_type_1.BattleType />
                            <battle_counters_1.BattleCounters />
                        </>) : <>
                        <map_rang_1.MapRang />
                        <counters_1.Counters />
                    </>}

                <map_layout_1.default />
                <map_bottom_1.MapBottom />

            </div>
        </div>);
};
exports.MapPage = MapPage;
