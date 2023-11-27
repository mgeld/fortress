"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleOver = void 0;
const arena_1 = require("entities/arena");
const ui_1 = require("shared/ui/button/ui");
const pointer_1 = require("entities/pointer");
const user_1 = require("entities/user");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const events_1 = require("shared/api/events");
const popout_root_1 = require("shared/ui/popout-root");
const _icons_1 = require("shared/assets/icons/_icons");
const _icons_2 = require("widgets/counters/icons/_icons");
const ship_1 = require("entities/ship");
const battle_shield_png_1 = __importDefault(require("shared/assets/icons//battle-shield.png"));
const battle_shield_red_png_1 = __importDefault(require("shared/assets/icons//battle-shield-red.png"));
const BattleOver = () => {
    var _a;
    const user = user_1.userModel.selectors.useUser();
    const teams = arena_1.arenaModel.selectors.useTeams().data;
    const userTeam = teams.find(team => team.members.find(member => member.userId === user.userId));
    teams.sort((a, b) => a.teamId === (userTeam === null || userTeam === void 0 ? void 0 : userTeam.teamId) ? -1 : 1);
    const pointers = pointer_1.pointerMapModel.selectors.usePointers().data;
    const leaveBattle = () => {
        pointer_1.pointerMapModel.events.clearStore();
        events_1.sectorsAPI.events.setSectors([]);
        events_1.mapAPI.events.setMapMode('invade');
        popout_root_1.popoutModel.events.setPopout(null);
        events_1.battleAPI.events.setTeams([]);
        events_1.battleAPI.events.setTimer(0);
        events_1.battleAPI.events.setBattleStatus('default');
        ship_1.shipModel.events.resetUser();
    };
    const myTrophies = userTeam ? ((_a = userTeam.members.find(pointer => pointer.userId === user.userId)) === null || _a === void 0 ? void 0 : _a.trophies) || 0 : 0;
    return (<div className={styles_module_scss_1.default.battleRoot}>
            <div className={styles_module_scss_1.default.battleOver}>
                <div className={styles_module_scss_1.default.__content}>

                    <div className={styles_module_scss_1.default.__shield}>
                        


                        {(userTeam === null || userTeam === void 0 ? void 0 : userTeam.status) === 'victory' || (userTeam === null || userTeam === void 0 ? void 0 : userTeam.status) === 'draw' ?
            <img src={battle_shield_png_1.default} alt="<>"/> :
            <img src={battle_shield_red_png_1.default} alt="<>"/>}
                    </div>

                    {teams.map((team, i) => {
            if (team.members.length < 1)
                return <></>;
            return (<div className={[styles_module_scss_1.default.__team, styles_module_scss_1.default[team.status], styles_module_scss_1.default[`team${i}`]].join(' ')}>

                                {team.teamId === (userTeam === null || userTeam === void 0 ? void 0 : userTeam.teamId) && (<>
                                    <div className={styles_module_scss_1.default.__header}>
                                        <div className={styles_module_scss_1.default.__left}>
                                            {team.status === 'victory' ? 'Победа!' : team.status === 'defeat' ? 'Поражение :(' : 'Ничья :('}
                                        </div>
                                        <div className={styles_module_scss_1.default.__right}>
                                            <div className={styles_module_scss_1.default.__icon}>
                                                <_icons_2.IconTrophy width={34} height={34}/>
                                            </div>
                                            <div className={styles_module_scss_1.default.__text}>
                                                {myTrophies > 0 ? `+${myTrophies}` : myTrophies}
                                            </div>
                                        </div>
                                    </div>
                                </>)}

                                {team.members.length > 0 && team.teamId !== (userTeam === null || userTeam === void 0 ? void 0 : userTeam.teamId) && (<div className={styles_module_scss_1.default.__swords}>
                                        <_icons_1.IconBattleSwords width={52} height={52}/>
                                    </div>)}

                                <div className={styles_module_scss_1.default.__users}>

                                    {team.members.map(member => {
                    const pointer = (member.userId === user.userId) ? {
                        name: user.userName,
                        icon: user.userIcon
                    } : pointers.find(pointer => pointer.userId === member.userId);
                    return (<div className={styles_module_scss_1.default.__user}>

                                                <div className={styles_module_scss_1.default.__icon}>
                                                    <img src={pointer === null || pointer === void 0 ? void 0 : pointer.icon} alt={''}/>
                                                </div>

                                                <div className={styles_module_scss_1.default.__username}>
                                                    {pointer === null || pointer === void 0 ? void 0 : pointer.name}
                                                </div>

                                                <div className={styles_module_scss_1.default.__trophies}>
                                                    <div className={styles_module_scss_1.default.__icon}>
                                                        <_icons_2.IconTrophy width={30} height={30}/>
                                                    </div>
                                                    <div className={styles_module_scss_1.default.__text}>
                                                        <span>
                                                            {member.trophies >= 0 ? '+' + member.trophies : member.trophies}
                                                        </span>
                                                    </div>
                                                    <div className={styles_module_scss_1.default.__whiteEffect}><div /></div>
                                                </div>

                                            </div>);
                })}
                                </div>

                            </div>);
        })}

                    <div className={styles_module_scss_1.default.button}>
                        <ui_1.Button className={styles_module_scss_1.default.__button} text="Вернуться" radius={10} onClick={leaveBattle}/>
                    </div>

                </div>
            </div>
        </div>);
};
exports.BattleOver = BattleOver;
