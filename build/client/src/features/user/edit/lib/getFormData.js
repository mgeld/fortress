"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormData = void 0;
const getFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
};
exports.getFormData = getFormData;
