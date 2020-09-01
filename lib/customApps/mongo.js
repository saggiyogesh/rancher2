"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMongo36 = void 0;
const project_1 = require("../project");
const utils_1 = require("../utils");
async function deployMongo36(projectName, name, targetNamespace, yml = 'helm/mongo36.yml') {
    await project_1.deployApp(projectName, {
        catalogId: 'library',
        template: 'mongodb',
        version: '7.2.6',
        name,
        targetNamespace,
        valuesYaml: await utils_1.getYMLFromGHRepo(yml),
    });
}
exports.deployMongo36 = deployMongo36;
