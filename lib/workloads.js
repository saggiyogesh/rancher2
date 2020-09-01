"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.update = exports.getAllWorkloads = exports.getAllDeployments = void 0;
const assert_1 = __importDefault(require("assert"));
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
    assert_1.default(projectId, 'Missing Project Id');
    assert_1.default(id, 'Missing Id');
    const { data } = await utils_1.client.put(`project/${projectId}/workloads/${id}`, deploymentObj);
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
