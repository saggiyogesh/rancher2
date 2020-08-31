import { deployApp } from '../project';

import { getYMLFromGHRepo } from '../utils';

export async function deployKibana(projectName: string, name: string, targetNamespace: string) {
  await deployApp(projectName, {
    catalogId: 'elastic',
    template: 'kibana',
    version: '7.7.1',
    name,
    targetNamespace,
    valuesYaml: await getYMLFromGHRepo('helm/kibana.yml'),
  });
}
