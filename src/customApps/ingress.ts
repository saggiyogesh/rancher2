import { deployApp, getUniqueProject } from '../project';

import { getYMLFromGHRepo } from '../utils';
import assert from 'assert';
import { newConfigMap, cloneAndDeleteConfigMap } from '../configMap';
import { createNamespaceIfNotExists } from '../cluster';

export async function deployNginxIngress(
  projectName: string,
  name: string,
  skipCRD: string,
  targetNamespace = 'nginx-ingress'
) {
  assert(skipCRD, 'Provide either true or false. If installing `nginx-ingress` for first time pass `true`');

  const project = await getUniqueProject(projectName);
  const { id: projectId, clusterId } = project;

  // createNamespaceIfNotExists
  await createNamespaceIfNotExists(targetNamespace, clusterId, projectId);

  // create config map for additional files
  const configMapName = 'nginx-configs';

  await cloneAndDeleteConfigMap(configMapName, targetNamespace, projectId);

  await newConfigMap({
    projectId,
    name: configMapName,
    namespaceId: targetNamespace,
    data: {
      'jwt.js': await getYMLFromGHRepo('configFiles/nginxIngress/jwt.js'),
      'cors.conf': await getYMLFromGHRepo('configFiles/nginxIngress/cors.conf'),
    },
  });

  // @ts-ignore as converting skipCRD to boolean from string
  skipCRD = skipCRD === 'true' ? true : false;

  let yml = await getYMLFromGHRepo('helm/nginx-ingress.yml');

  if (!skipCRD) {
    yml = yml.replace('enableCustomResources: true', 'enableCustomResources: false');
  }

  console.log('nginx-ingress-yml -- ', yml);

  const app = await deployApp(projectName, {
    catalogId: 'nginx',
    template: 'nginx-ingress',
    version: '0.6.0',
    name,
    targetNamespace,
    valuesYaml: yml,
  });

  console.log('deployNginxIngress', app);
}
