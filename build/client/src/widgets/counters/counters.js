"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const counter_1 = require("shared/ui/counter");
const _icons_1 = require("./icons/_icons");
const react_1 = require("react");
const counter_progress_1 = require("shared/ui/counter-progress");
const zone_1 = require("entities/zone");
const user_1 = require("entities/user");
const exp_rank_1 = require("entities/user/lib/exp-rank");
const ui_1 = require("shared/ui/tooltip/ui");
const zone_level_1 = require("entities/zone/lib/zone-level");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const Counters = () => {
    const [tooltip, setTooltip] = (0, react_1.useState)(null);
    const tId = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        clearTimeout(tId.current);
        tId.current = setTimeout(() => {
            setTooltip(null);
        }, 6000);
    }, [tooltip]);
    const zoneLevel = zone_1.zoneModel.selectors.useZoneLevel();
    const rankLevel = user_1.userModel.selectors.useRankLevel();
    const sects = zone_1.zoneModel.selectors.useZoneSectors();
    const trophy = zone_1.zoneModel.selectors.useZoneTrophies();
    const rankExp = user_1.userModel.selectors.useRankExp();
    const progressExp = rankExp * 100 / exp_rank_1.ExpRank.getExp(rankLevel);
    const zoneSects = sects - (zone_level_1.ZoneLevel.getMaxLevelAllSectors(zoneLevel - 1) || 0);
    const zoneProgress = zoneSects * 100 / zone_level_1.ZoneLevel.getMaxLevelSectors(zoneLevel);
    return (<>
            <counter_1.Counter width={74} onClick={() => setTooltip(1)} className={styles_module_scss_1.default.__sector} icon={<_icons_1.IconSector />} text={String(zone_1.zoneModel.selectors.useZoneSectors())}>
                {tooltip === 1 ? (<ui_1.Tooltip pos="right" message="Все завоеванные территории"/>) : <></>}
            </counter_1.Counter>
            <counter_1.Counter onClick={() => setTooltip(2)} width={74} className={styles_module_scss_1.default.__trophy} icon={(<_icons_1.IconTrophy />)} text={String(trophy)}>
                {tooltip === 2 ? <ui_1.Tooltip pos="right" message="Трофеи за сражения на арене"/> : <></>}
            </counter_1.Counter>

            <counter_1.Counter width={74} onClick={() => setTooltip(3)} className={styles_module_scss_1.default.__coin} icon={(<_icons_1.IconCoin />)} text={String(zone_1.zoneModel.selectors.useZoneCoins())}>

                {tooltip === 3 ? (<ui_1.Tooltip pos="right" message="Монеты"/>) : <></>}

            </counter_1.Counter>

            <counter_1.Counter width={74} onClick={() => setTooltip(4)} className={styles_module_scss_1.default.__sapphire} icon={<_icons_1.IconSapphire />} text={String(zone_1.zoneModel.selectors.useZoneRubies())}>

                {tooltip === 4 ? <ui_1.Tooltip pos="right" message="Кристаллы"/> : <></>}
            </counter_1.Counter>

            <counter_progress_1.CounterProgress onClick={() => setTooltip(5)} className={styles_module_scss_1.default.__experience} position="left" icon={<_icons_1.IconExperience />} progress={progressExp} color="#C163E0" counter={rankExp} width={73}>
                {tooltip === 5 ? (<ui_1.Tooltip pos="left" message="Опыт завоеваний"/>) : <></>}
            </counter_progress_1.CounterProgress>

            <counter_progress_1.CounterProgress onClick={() => setTooltip(6)} className={styles_module_scss_1.default.__zone} position="left" icon={<_icons_1.IconZone />} progress={zoneProgress} color="#C163E0" name={`Зона: ${zoneLevel} ур`} counter={zoneSects} width={73}>
                {tooltip === 6 ? (<ui_1.Tooltip pos="left" message="Гексы текущего уровня зоны"/>) : <></>}
            </counter_progress_1.CounterProgress>

        </>);
};
exports.Counters = Counters;
