"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goLink = void 0;
const goLink = (link) => {
    let a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.click();
};
exports.goLink = goLink;
