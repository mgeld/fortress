"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomSelectPlace = void 0;
const map_1 = require("entities/map");
const events_1 = require("shared/api/events");
const alert_1 = require("shared/ui/alert");
const bottom_flex_1 = require("shared/ui/bottom-flex");
const ui_1 = require("shared/ui/button/ui");
const notice_1 = require("shared/ui/notice");
const popout_root_1 = require("shared/ui/popout-root");
const tutorial_1 = require("shared/ui/tutorial");
const BottomSelectPlace = () => {
    const pos = map_1.mapModel.selectors.useMapClickLatLng().latlng;
    const selectPosition = (pos) => {
        if (!pos) {
            alert_1.alertModel.events.setAlert({
                action: {
                    text: 'Понятно',
                    _click: () => popout_root_1.popoutModel.events.setPopout(null)
                },
                alert: 'Выбор места',
                message: 'Коснитесь карты, чтобы выбрать место для захвата территорий'
            });
            popout_root_1.popoutModel.events.setPopout('alert');
            return;
        }
        if (pos[0] > 0 && pos[1] > 0) {
            events_1.mapAPI.events.setMapMode('invade');
            events_1.shipAPI.events.setPos(pos);
            setTimeout(() => {
                tutorial_1.tutorialModel.events.setTutorial('storm');
            }, 2000);
        }
        else {
            notice_1.noticeModel.events.newToast({
                name: 'Упс...',
                text: 'В вашей стране пока нельзя завоевывать территории, но вы можете выбрать любое место в России или странах СНГ!',
                t: 'common'
            });
        }
    };
    return (<bottom_flex_1.BottomFlex text="Выбор места дислокации" button={<ui_1.Button className="" radius={10} disabled={!pos} text="Сохранить" onClick={() => selectPosition(pos)}/>}/>);
};
exports.BottomSelectPlace = BottomSelectPlace;
