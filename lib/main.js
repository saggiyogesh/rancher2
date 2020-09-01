"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workloads = exports.pods = exports.hpa = exports.customApps = exports.project = exports.cluster = void 0;
const assert_1 = __importDefault(require("assert"));
const cluster = __importStar(require("./cluster"));
exports.cluster = cluster;
const project = __importStar(require("./project"));
exports.project = project;
const customApps = __importStar(require("./customApps/main"));
exports.customApps = customApps;
const hpa = __importStar(require("./hpa"));
exports.hpa = hpa;
const pods = __importStar(require("./pods"));
exports.pods = pods;
const workloads = __importStar(require("./workloads"));
exports.workloads = workloads;
const { RANCHER_API_KEY, RANCHER_SERVER_API } = process.env;
assert_1.default(RANCHER_API_KEY, 'Missing env var RANCHER_API_KEY');
assert_1.default(RANCHER_SERVER_API, 'Missing env var RANCHER_SERVER_API');
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
