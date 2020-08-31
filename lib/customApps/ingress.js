"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployNginxIngress = void 0;
const project_1 = require("../project");
const utils_1 = require("../utils");
const assert_1 = __importDefault(require("assert"));
const configMap_1 = require("../configMap");
const cluster_1 = require("../cluster");
async function deployNginxIngress(projectName, name, skipCRD, targetNamespace = 'nginx-ingress') {
    assert_1.default(skipCRD, 'Provide either true or false. If installing `nginx-ingress` for first time pass `true`');
    const project = await project_1.getUniqueProject(projectName);
    const { id: projectId, clusterId } = project;
    // createNamespaceIfNotExists
    await cluster_1.createNamespaceIfNotExists(targetNamespace, clusterId, projectId);
    // create config map for additional files
    const configMapName = 'nginx-configs';
    await configMap_1.cloneAndDeleteConfigMap(configMapName, targetNamespace, projectId);
    await configMap_1.newConfigMap({
        projectId,
        name: configMapName,
        namespaceId: targetNamespace,
        data: {
            'jwt.js': await utils_1.getYMLFromGHRepo('configFiles/nginxIngress/jwt.js'),
            'cors.conf': await utils_1.getYMLFromGHRepo('configFiles/nginxIngress/cors.conf'),
        },
    });
    // @ts-ignore as converting skipCRD to boolean from string
    skipCRD = skipCRD === 'true' ? true : false;
    let yml = await utils_1.getYMLFromGHRepo('helm/nginx-ingress.yml');
    if (!skipCRD) {
        yml = yml.replace('enableCustomResources: true', 'enableCustomResources: false');
    }
    console.log('nginx-ingress-yml -- ', yml);
    const app = await project_1.deployApp(projectName, {
        catalogId: 'nginx',
        template: 'nginx-ingress',
        version: '0.6.0',
        name,
        targetNamespace,
        valuesYaml: yml,
    });
    console.log('deployNginxIngress', app);
}
exports.deployNginxIngress = deployNginxIngress;
