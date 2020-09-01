"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.update = exports.getAllWorkloads = exports.getAllDeployments = void 0;
const project_1 = require("./project");
const utils_1 = require("./utils");
async function getAll(projectName, type) {
    const project = await project_1.getUniqueProject(projectName);
    const { id: projectId } = project;
    const { data } = await utils_1.client.get(`/project/${projectId}/${type}`);
    return data.data;
}
async function getAllDeployments(projectName) {
    return getAll(projectName, 'deployments');
}
exports.getAllDeployments = getAllDeployments;
async function getAllWorkloads(projectName) {
    return getAll(projectName, 'workloads');
}
exports.getAllWorkloads = getAllWorkloads;
async function update(deploymentObj) {
    const { projectId, id } = deploymentObj;
    const { data } = await utils_1.client.put(`project/${projectId}/workloads/${id}`);
    return data.data;
}
exports.update = update;
async function get(projectName, id) {
    const project = await project_1.getUniqueProject(projectName);
    const { id: projectId } = project;
    const { data } = await utils_1.client.get(`project/${projectId}/workloads/${id}`);
    return data.data;
}
exports.get = get;
