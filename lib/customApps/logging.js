"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployKibana = void 0;
const project_1 = require("../project");
const utils_1 = require("../utils");
async function deployKibana(projectName, name, targetNamespace) {
    await project_1.deployApp(projectName, {
        catalogId: 'elastic',
        template: 'kibana',
        version: '7.7.1',
        name,
        targetNamespace,
        valuesYaml: await utils_1.getYMLFromGHRepo('helm/kibana.yml'),
    });
}
exports.deployKibana = deployKibana;
