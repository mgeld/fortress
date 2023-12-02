"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleCounters = void 0;
const _icons_1 = require("./icons/_icons");
const react_1 = require("react");
const counter_progress_1 = require("shared/ui/counter-progress");
const ui_1 = require("shared/ui/tooltip/ui");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const arena_1 = require("entities/arena");
const BattleCounters = () => {
    const [tooltip, setTooltip] = (0, react_1.useState)(null);
    const tId = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        clearTimeout(tId.current);
        tId.current = setTimeout(() => {
            setTooltip(null);
        }, 6000);
    }, [tooltip]);
    const myTeamId = arena_1.arenaModel.selectors.useMyTeamId().data;
    const teams = arena_1.arenaModel.selectors.useTeams().data;
    const myTeam = teams.filter(team => team.teamId === myTeamId)[0];
    const enemyTeam = teams.filter(team => team.teamId !== myTeamId)[0];
    const myProgress = (myTeam === null || myTeam === void 0 ? void 0 : myTeam.sectors) * 100 / 5;
    const enemyProgress = (enemyTeam === null || enemyTeam === void 0 ? void 0 : enemyTeam.sectors) * 100 / 5;
    const myTeamColor = (myTeam === null || myTeam === void 0 ? void 0 : myTeam.teamId) === 1 ? '#C163E0' : '#D14343';
    const enemyTeamColor = (enemyTeam === null || enemyTeam === void 0 ? void 0 : enemyTeam.teamId) === 1 ? '#C163E0' : '#D14343';
    return (<>
            <counter_progress_1.CounterProgress onClick={() => setTooltip(1)} className={styles_module_scss_1.default.__teamLeft} position="left" icon={(myTeam === null || myTeam === void 0 ? void 0 : myTeam.teamId) === 1 ? <_icons_1.IconZone /> : <_icons_1.IconZoneRed />} progress={myProgress} color={myTeamColor} name={`Вы`} counter={myTeam === null || myTeam === void 0 ? void 0 : myTeam.sectors} width={90}>
                {tooltip === 1 ? (<ui_1.Tooltip pos="left" message="Гексы текущего уровня зоны"/>) : <></>}
            </counter_progress_1.CounterProgress>

            <counter_progress_1.CounterProgress onClick={() => setTooltip(2)} position="right" className={styles_module_scss_1.default.__teamRight} icon={(enemyTeam === null || enemyTeam === void 0 ? void 0 : enemyTeam.teamId) === 1 ? <_icons_1.IconZone /> : <_icons_1.IconZoneRed />} progress={enemyProgress} color={enemyTeamColor} name={`Противник`} counter={enemyTeam === null || enemyTeam === void 0 ? void 0 : enemyTeam.sectors} width={90}>
                {tooltip === 2 ? (<ui_1.Tooltip pos="right" message="Гексы текущего уровня зоны"/>) : <></>}
            </counter_progress_1.CounterProgress>

        </>);
};
exports.BattleCounters = BattleCounters;
