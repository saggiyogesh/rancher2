"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.getAll = void 0;
const project_1 = require("./project");
const utils_1 = require("./utils");
async function getAll(projectName, type) {
    const project = await project_1.getUniqueProject(projectName);
    const { id: projectId } = project;
    const { data } = await utils_1.client.get(`/project/${projectId}/pods`);
    return data.data;
}
exports.getAll = getAll;
async function get(projectName, id) {
    const project = await project_1.getUniqueProject(projectName);
    const { id: projectId } = project;
    const { data } = await utils_1.client.get(`project/${projectId}/pods/${id}`);
    return data.data;
}
exports.get = get;
