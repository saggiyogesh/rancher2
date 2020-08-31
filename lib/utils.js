"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.btoa = exports.createNewError = exports.getYMLFromGHRepo = exports.client = void 0;
const axios_1 = __importDefault(require("axios"));
// YML_REPO=saggiyogesh/rancher-ymls
// PAT=Github Personal token to pull ymls from private repo
const { RANCHER_SERVER_API, RANCHER_API_KEY, YML_REPO = 'saggiyogesh/rancher-ymls', PAT, YML_REPO_BRANCH = 'master', } = process.env;
exports.client = axios_1.default.create({
    baseURL: RANCHER_SERVER_API,
    timeout: 4000,
    headers: {
        Authorization: `Bearer ${RANCHER_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'rancher-node',
    },
});
async function getYMLFromGHRepo(path) {
    const config = {};
    if (PAT) {
        config.headers = {
            Authorization: `token ${PAT}`,
        };
    }
    const url = `https://raw.githubusercontent.com/${YML_REPO}/${YML_REPO_BRANCH}/${path}`;
    const { data } = await axios_1.default.get(url, config);
    return data;
}
exports.getYMLFromGHRepo = getYMLFromGHRepo;
function createNewError(message, code) {
    const e = new Error(message);
    e.code = code;
    return e;
}
exports.createNewError = createNewError;
function btoa(str) {
    return Buffer.from(str, 'binary').toString('base64');
}
exports.btoa = btoa;
