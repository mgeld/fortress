"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.selectors = exports.$snackbarStore = void 0;
const effector_1 = require("effector");
const effector_react_1 = require("effector-react");
const useSnackbar = () => {
    return {
        data: (0, effector_react_1.useStore)(exports.$snackbarStore)
    };
};
const newToast = (0, effector_1.createEvent)();
const addToast = (0, effector_1.createEvent)();
const setToast = (0, effector_1.createEvent)();
const delToastById = (0, effector_1.createEvent)();
exports.$snackbarStore = (0, effector_1.createStore)([])
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 4))])
    .on(setToast, (toasts, toast) => toasts.map(item => {
    return item.type === toast.type ? Object.assign(Object.assign({}, item), { count: item.count + 1 }) : item;
}))
    .on(addToast, (toasts, toast) => [toast, ...(toasts.splice(0, 4))])
    .on(delToastById, (toasts, toast) => (toasts.filter(item => {
    if (item.id === toast.toast_id)
        return false;
    return true;
})));
const newToastFx = (0, effector_1.createEffect)(({ toast, toasts }) => {
    const TOAST_ID = Date.now();
    if (~toasts.findIndex(item => item.type === toast.t)) {
        setToast({
            id: TOAST_ID,
            type: toast.t,
            text: toast.text
        });
    }
    else {
        addToast({
            id: TOAST_ID,
            count: 1,
            type: toast.t,
            text: toast.text
        });
    }
    setTimeout(() => {
        delToastById({ toast_id: TOAST_ID });
    }, 4000);
});
(0, effector_1.sample)({
    clock: newToast,
    source: exports.$snackbarStore,
    fn: (source, clock) => ({ toast: clock, toasts: source }),
    target: newToastFx
});
exports.selectors = {
    useSnackbar,
};
exports.events = {
    newToast
};
