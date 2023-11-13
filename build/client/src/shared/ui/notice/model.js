"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$noticeStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const useNotice = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$noticeStore)
    };
};
const newToast = (0, effector_1.createEvent)();
const addToast = (0, effector_1.createEvent)();
const delToastById = (0, effector_1.createEvent)();
exports.$noticeStore = (0, effector_1.createStore)([])
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 2))])
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 2))])
    .on(delToastById, (toasts, toast) => (toasts.filter(item => {
    if (item.id === toast.toast_id)
        return false;
    return true;
})));
const newToastFx = (0, effector_1.createEffect)(({ toast, }) => {
    const TOAST_ID = Date.now();
    addToast({
        id: TOAST_ID,
        name: toast.name,
        text: toast.text,
        type: toast.t,
    });
    setTimeout(() => {
        delToastById({ toast_id: TOAST_ID });
    }, 6000);
});
(0, effector_1.sample)({
    clock: newToast,
    fn: (clock) => ({ toast: clock }),
    target: newToastFx
});
exports.selectors = {
    useNotice,
};
exports.events = {
    newToast
};
