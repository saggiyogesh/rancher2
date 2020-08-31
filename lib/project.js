"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSecret = exports.getSecret = exports.deployApp = exports.getApp = exports.getUniqueProject = exports.addRegistrySecret = exports.newProject = exports.getProject = exports.getProjectByNameAndClusterId = void 0;
const assert_1 = __importDefault(require("assert"));
const utils_1 = require("./utils");
const cluster_1 = require("./cluster");
async function getProjectByNameAndClusterId(projectName, clusterId) {
    assert_1.default(projectName, 'Missing Project name');
    assert_1.default(clusterId, 'Missing cluster Id');
    const { data } = await utils_1.client.get(`projects?name=${projectName}&clusterId=${clusterId}`);
    return data.data;
}
exports.getProjectByNameAndClusterId = getProjectByNameAndClusterId;
async function getProject(projectName) {
    assert_1.default(projectName, 'Missing Project name');
    const { data } = await utils_1.client.get(`projects?name=${projectName}`);
    return data.data;
}
exports.getProject = getProject;
async function newProject(obj) {
    assert_1.default(obj, 'Missing Project object to be inserted');
    obj.enableProjectMonitoring = obj.enableProjectMonitoring || false;
    obj.labels = obj.labels || {};
    obj.type = 'project';
    assert_1.default(obj.clusterId, 'Missing Cluster Id');
    assert_1.default(obj.name, 'Missing Project name');
    const { data: newPrj } = await utils_1.client.post(`/project`, obj);
    return newPrj;
}
exports.newProject = newProject;
async function addRegistrySecret(obj) {
    assert_1.default(obj, 'Missing Registry secret object to be inserted');
    assert_1.default(obj.name, 'Missing Registry secret name');
    assert_1.default(obj.projectId, 'Missing Project Id');
    assert_1.default(obj.registries, 'Missing registries data');
    assert_1.default(Object.keys(obj.registries).length, 'Missing Registry details');
    const { projectId } = obj;
    obj.type = 'dockerCredential';
    const { data } = await utils_1.client.post(`/projects/${projectId}/dockercredential`, obj);
    return data;
}
exports.addRegistrySecret = addRegistrySecret;
async function getUniqueProject(projectName) {
    if (projectName === 'System') {
        throw utils_1.createNewError('For `System` project, provide it with cluster name. Format: `System:<clusterName>`', 'SYSTEM_PROJECT');
    }
    let projectArr = [];
    if (projectName.indexOf(':') > -1) {
        // has cluster name in project name
        const [prjName, clusterName] = projectName.split(':');
        console.log('Fetched cluster name :', clusterName);
        const cluster = await cluster_1.getUniqueCluster(clusterName);
        projectArr = await getProjectByNameAndClusterId(prjName, cluster.id);
    }
    else {
        projectArr = await getProject(projectName);
    }
    if (projectArr.length > 1) {
        throw utils_1.createNewError(`Found ${projectArr.length} projects with name: ${projectName}`, 'MULTIPLE_PROJECTS');
    }
    if (!projectArr.length) {
        throw utils_1.createNewError(`No project found with name: ${projectName}`, 'INVALID_PROJECT_NAME');
    }
    return projectArr[0];
}
exports.getUniqueProject = getUniqueProject;
async function getApp(name, projectId) {
    assert_1.default(projectId, 'Missing Project id');
    assert_1.default(name, 'Missing App name');
    const { data } = await utils_1.client.get(`/projects/${projectId}/apps?name=${name}`);
    return data.data;
}
exports.getApp = getApp;
async function deployApp(projectName, obj) {
    const { name, catalogId, template, version, description, labels, annotations, targetNamespace, valuesYaml } = obj;
    assert_1.default(name, 'Missing App name');
    assert_1.default(catalogId, 'Missing App catalog id');
    assert_1.default(template, 'Missing App template');
    assert_1.default(version, 'Missing App version');
    assert_1.default(targetNamespace, 'Missing App target namespace');
    const project = await getUniqueProject(projectName);
    const { id: projectId, clusterId } = project;
    // find and create the namespace
    await cluster_1.createNamespaceIfNotExists(targetNamespace, clusterId, projectId);
    const externalId = `catalog://?catalog=${catalogId}&template=${template}&version=${version}`;
    // check if with name app already exists
    const appsArr = await getApp(name, projectId);
    if (appsArr.length) {
        // update the existing app
        const [app] = appsArr;
        const { data } = await utils_1.client.post(`/project/${projectId}/apps/${app.id}?action=upgrade`, {
            externalId,
            valuesYaml,
            forceUpgrade: false,
            answers: {},
        });
    }
    else {
        // create a new app
        const { data } = await utils_1.client.post(`/projects/${projectId}/apps`, {
            externalId,
            targetNamespace,
            description,
            name,
            labels,
            annotations,
            timeout: 300,
            wait: true,
            valuesYaml,
        });
        return data;
    }
}
exports.deployApp = deployApp;
async function getSecret(secretName, projectId) {
    assert_1.default(projectId);
    assert_1.default(secretName);
    const { data } = await utils_1.client.get(`projects/${projectId}/secrets?name=${secretName}`);
    return data.data;
}
exports.getSecret = getSecret;
async function newSecret(obj) {
    assert_1.default(obj);
    obj.labels = obj.labels || {};
    obj.type = 'secret';
    assert_1.default(obj.projectId);
    assert_1.default(obj.name);
    assert_1.default(Object.keys(obj.data).length, 'Secret details are not specified');
    const data = {};
    for (const [k, v] of Object.entries(obj.data)) {
        data[k] = utils_1.btoa(v);
    }
    obj.data = data;
    const { data: newSec } = await utils_1.client.post(`projects/${obj.projectId}/secret`, obj);
    return newSec;
}
exports.newSecret = newSecret;
