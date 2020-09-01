import { deployApp } from '../project';

import { getYMLFromGHRepo } from '../utils';

export async function deployMongo36(
  projectName: string,
  name: string,
  targetNamespace: string,
  yml = 'helm/mongo36.yml'
) {
  await deployApp(projectName, {
    catalogId: 'library',
    template: 'mongodb',
    version: '7.2.6',
    name,
    targetNamespace,
    valuesYaml: await getYMLFromGHRepo(yml),
  });
}
