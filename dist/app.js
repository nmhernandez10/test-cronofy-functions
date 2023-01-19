"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = require("firebase-admin");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const cronofy_service_1 = require("./cronofy_service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.get('/', (_, res) => {
    res.sendStatus(200);
});
app.get('/auth-callback', async (req, res) => {
    var _a, _b;
    const flutterUrl = config_1.Config.flutterUrl;
    await (0, firebase_admin_1.firestore)().collection('auth-callbacks').doc().create({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        createdAt: firebase_admin_1.firestore.Timestamp.now(),
    });
    const authCode = (_a = req.query['code']) !== null && _a !== void 0 ? _a : '';
    const state = (_b = req.query['state']) !== null && _b !== void 0 ? _b : '';
    const createTokenResponse = await cronofy_service_1.NylasService.createAccessToken(authCode);
    await (0, firebase_admin_1.firestore)().collection('users').doc(createTokenResponse.data.account_id).set({
        authData: createTokenResponse.data,
        state: state,
        createdAt: firebase_admin_1.firestore.Timestamp.now(),
    });
    res.redirect(flutterUrl);
});
app.post('/webhooks-callback', async (req, res) => {
    await (0, firebase_admin_1.firestore)().collection('webhooks-callbacks').doc().create({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        createdAt: firebase_admin_1.firestore.Timestamp.now(),
    });
    res.sendStatus(200).send();
});
app.post('/scheduler-webhooks', async (req, res) => {
    await (0, firebase_admin_1.firestore)().collection('scheduler-webhooks').doc().create({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        createdAt: firebase_admin_1.firestore.Timestamp.now(),
    });
    res.sendStatus(200);
});
app.get('/scheduler-booking-page', async (req, res) => {
    await (0, firebase_admin_1.firestore)().collection('scheduler-booking-page-reqs').doc().create({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        createdAt: firebase_admin_1.firestore.Timestamp.now(),
    });
    res.sendStatus(200);
});
exports.default = app;
//# sourceMappingURL=app.js.map