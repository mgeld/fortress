"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const reducer = (state, action) => {
    switch (action.type) {
        case 'FORWARD':
            return [state[0] + 0.0006, state[1]];
        case 'BACKWARD':
            return [state[0] - 0.0006, state[1]];
        case 'LEFT':
            return [state[0], state[1] - 0.0010];
        case 'RIGHT':
            return [state[0], state[1] + 0.0010];
        default:
            return state;
    }
};
exports.reducer = reducer;
