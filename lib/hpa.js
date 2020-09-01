"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = void 0;
const assert_1 = __importDefault(require("assert"));
const project_1 = require("./project");
const utils_1 = require("./utils");
async function getAll(projectName) {
    const project = await project_1.getUniqueProject(projectName);
    const { id: projectId } = project;
    const { data } = await utils_1.client.get(`/project/${projectId}/horizontalpodautoscalers`);
    return data.data;
}
exports.getAll = getAll;
async function update(hpaObj) {
    const { projectId, id } = hpaObj;
    assert_1.default(projectId, 'Missing Project Id');
    assert_1.default(id, 'Missing HPA Id');
    const { data } = await utils_1.client.put(`/project/${projectId}/horizontalPodAutoscalers/${id}`, hpaObj);
    return data.data;
}
exports.update = update;
