"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployES7 = void 0;
const project_1 = require("../project");
const utils_1 = require("../utils");
const { S3_ACCESS_KEY, S3_ACCESS_SECRET, S3_SECRET_NAME = 's3' } = process.env;
async function deployES7(projectName, name, targetNamespace, version, yml = 'helm/elasticsearch.yml') {
    const { id: projectId } = await project_1.getUniqueProject(projectName);
    if (S3_ACCESS_KEY && S3_ACCESS_SECRET) {
        // check if s3 secret already exists
        const secretArr = await project_1.getSecret(S3_SECRET_NAME, projectId);
        if (!secretArr.length) {
            // create secret
            await project_1.newSecret({
                projectId,
                name: S3_SECRET_NAME,
                data: {
                    's3.client.default.access_key': S3_ACCESS_KEY,
                    's3.client.default.secret_key': S3_ACCESS_SECRET,
                },
            });
        }
    }
    else {
        console.log('S3_ACCESS_KEY & S3_ACCESS_SECRET are not provided');
    }
    await project_1.deployApp(projectName, {
        catalogId: 'elastic',
        template: 'elasticsearch',
        version,
        name,
        targetNamespace,
        valuesYaml: await utils_1.getYMLFromGHRepo(yml),
    });
}
exports.deployES7 = deployES7;
