"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTemplateAndImport = exports.importYAML = exports.createNamespaceIfNotExists = exports.getNamespace = exports.newNamespace = exports.getKubeConfig = exports.getUniqueCluster = exports.getCluster = void 0;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
async function getCluster(clusterName) {
    assert_1.default(clusterName, 'Missing Cluster name');
    const { data } = await utils_1.client.get(`/clusters?name=${clusterName}`);
    return data.data;
}
exports.getCluster = getCluster;
async function getUniqueCluster(clusterName) {
    const clusterArr = await getCluster(clusterName);
    if (clusterArr.length > 1) {
        throw utils_1.createNewError(`Found ${clusterArr.length} clusters with name: ${clusterName}`, 'MULTIPLE_CLUSTERS');
    }
    if (!clusterArr.length) {
        throw utils_1.createNewError(`No cluster found with name: ${clusterName}`, 'INVALID_CLUSTER_NAME');
    }
    return clusterArr[0];
}
exports.getUniqueCluster = getUniqueCluster;
async function getKubeConfig(clusterId) {
    assert_1.default(clusterId, 'Missing Cluster Id');
    const { data } = await utils_1.client.post(`/clusters/${clusterId}?action=generateKubeconfig`);
    return data.config;
}
exports.getKubeConfig = getKubeConfig;
async function newNamespace(obj) {
    assert_1.default(obj, 'Missing Namespace input object');
    const { clusterId } = obj;
    obj.resourceQuota = obj.resourceQuota || null;
    obj.labels = obj.labels || {};
    obj.type = 'namespace';
    assert_1.default(clusterId, 'Missing Cluster Id');
    assert_1.default(obj.name, 'Missing Namespace name');
    assert_1.default(obj.projectId, 'Missing Project Id');
    const { data: newNS } = await utils_1.client.post(`/clusters/${clusterId}/namespace`, obj);
    return newNS;
}
exports.newNamespace = newNamespace;
async function getNamespace(namespaceName, clusterId) {
    assert_1.default(clusterId, 'Missing Cluster Id');
    assert_1.default(namespaceName, 'Missing Namespace name');
    try {
        const { data } = await utils_1.client.get(`clusters/${clusterId}/namespaces/${namespaceName}`);
        return data;
    }
    catch (err) {
        const e = err;
        if (e.response?.status === 404) {
            return null;
        }
        throw e;
    }
}
exports.getNamespace = getNamespace;
async function createNamespaceIfNotExists(namespaceName, clusterId, projectId) {
    let ns = await getNamespace(namespaceName, clusterId);
    if (!ns) {
        ns = await newNamespace({ name: namespaceName, clusterId, projectId });
    }
    return ns;
}
exports.createNamespaceIfNotExists = createNamespaceIfNotExists;
async function importYAML(clusterId, namespace, yaml) {
    assert_1.default(clusterId, 'Missing Cluster Id');
    assert_1.default(namespace, 'Missing Namespace name');
    assert_1.default(yaml, 'Missing yml');
    console.log('yaml--', yaml);
    const { data } = await utils_1.client.post(`clusters/${clusterId}?action=importYaml`, {
        defaultNamespace: namespace,
        yaml,
    });
}
exports.importYAML = importYAML;
async function convertTemplateAndImport(clusterId, namespace, tmpl, tmplData) {
    assert_1.default(clusterId, 'Missing Cluster Id');
    assert_1.default(namespace, 'Missing Namespace name');
    assert_1.default(tmpl, 'Missing yml template');
    assert_1.default(tmplData, 'Missing yml tmpl data');
    const compiled = lodash_1.template(tmpl);
    await importYAML(clusterId, namespace, compiled(tmplData));
}
exports.convertTemplateAndImport = convertTemplateAndImport;
