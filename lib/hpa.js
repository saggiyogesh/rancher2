"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getAll = void 0;
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
    const { data } = await utils_1.client.put(`/project/${projectId}/horizontalPodAutoscalers/${id}`);
    return data.data;
}
exports.update = update;
