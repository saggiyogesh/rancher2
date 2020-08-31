"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneAndDeleteConfigMap = exports.deleteConfigMap = exports.checkAndGetConfigMap = exports.newConfigMap = void 0;
const console_1 = require("console");
const utils_1 = require("./utils");
async function newConfigMap(obj) {
    console_1.assert(obj);
    obj.labels = obj.labels || {};
    obj.type = 'configMap';
    console_1.assert(obj.name, 'Missing configmap name');
    console_1.assert(Object.keys(obj.data).length, 'Config map details are not specified');
    const { data: newConfig } = await utils_1.client.post(`projects/${obj.projectId}/configmap`, obj);
    return newConfig;
}
exports.newConfigMap = newConfigMap;
async function checkAndGetConfigMap(name, namespaceId, projectId) {
    console_1.assert(name, 'Missing configmap name');
    console_1.assert(namespaceId, 'Missing configmap namespaceId');
    console_1.assert(projectId, 'Missing configmap projectId');
    try {
        const { data: configMap } = await utils_1.client.get(`projects/${projectId}/configMaps/${namespaceId}:${name}`);
        return configMap;
    }
    catch (error) {
        return null;
    }
}
exports.checkAndGetConfigMap = checkAndGetConfigMap;
async function deleteConfigMap(name, namespaceId, projectId) {
    console_1.assert(name, 'Missing configmap name');
    console_1.assert(namespaceId, 'Missing configmap namespaceId');
    console_1.assert(projectId, 'Missing configmap projectId');
    const { data: configMap } = await utils_1.client.delete(`projects/${projectId}/configMaps/${namespaceId}:${name}`);
    console.log('config map delete', configMap);
}
exports.deleteConfigMap = deleteConfigMap;
async function cloneAndDeleteConfigMap(name, namespaceId, projectId) {
    console_1.assert(name, 'Missing configmap name');
    console_1.assert(namespaceId, 'Missing configmap namespaceId');
    console_1.assert(projectId, 'Missing configmap projectId');
    const configMap = await checkAndGetConfigMap(name, namespaceId, projectId);
    if (configMap) {
        console.log('configMap exists, cloning & deleting..', configMap);
        // create configmap clone
        await newConfigMap({
            projectId,
            name: `${name}-${Date.now()}`,
            namespaceId: namespaceId,
            data: configMap.data,
        });
        // delete the configmap
        await deleteConfigMap(name, namespaceId, projectId);
    }
}
exports.cloneAndDeleteConfigMap = cloneAndDeleteConfigMap;
