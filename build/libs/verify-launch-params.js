"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLaunchParams = void 0;
const crypto_1 = __importDefault(require("crypto"));
const verifyLaunchParams = (searchOrParsedUrlQuery, secretKey) => {
    var _a;
    let sign;
    const queryParams = [];
    const processQueryParam = (key, value) => {
        if (typeof value === 'string') {
            if (key === 'sign') {
                sign = value;
            }
            else if (key.startsWith('vk_')) {
                queryParams.push({ key, value });
            }
        }
    };
    if (typeof searchOrParsedUrlQuery === 'string') {
        const formattedSearch = searchOrParsedUrlQuery.startsWith('?')
            ? searchOrParsedUrlQuery.slice(1)
            : searchOrParsedUrlQuery;
        for (const param of formattedSearch.split('&')) {
            const [key, value] = param.split('=');
            processQueryParam(key, value);
        }
    }
    else {
        for (const key of Object.keys(searchOrParsedUrlQuery)) {
            const value = searchOrParsedUrlQuery[key];
            processQueryParam(key, value);
        }
    }
    if (!sign || queryParams.length === 0) {
        return false;
    }
    const queryString = queryParams
        .sort((a, b) => a.key.localeCompare(b.key))
        .reduce((acc, { key, value }, idx) => {
        return acc + (idx === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`;
    }, '');
    const paramsHash = crypto_1.default
        .createHmac('sha256', secretKey)
        .update(queryString)
        .digest()
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=$/, '');
    return {
        is_valid: paramsHash === sign,
        vk_id: Number((_a = queryParams.find(val => val.key === 'vk_user_id')) === null || _a === void 0 ? void 0 : _a.value)
    };
};
exports.verifyLaunchParams = verifyLaunchParams;
