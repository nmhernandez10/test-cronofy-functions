"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NylasService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
class NylasService {
    static createAccessToken(authCode) {
        return axios_1.default.post(`${config_1.Config.cronofyApiUrl}/oauth/token`, {
            client_id: config_1.Config.clientId,
            client_secret: config_1.Config.clientSecret,
            grant_type: 'authorization_code',
            code: authCode,
        }, {
            headers: NylasService.basicHeaders,
        });
    }
}
exports.NylasService = NylasService;
NylasService.basicHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
};
//# sourceMappingURL=cronofy_service.js.map