import { GenericObjectType } from './types';

import { assert } from 'console';

import { client } from './utils';

export interface IConfigMap {
  labels?: {};
  name: string;
  type?: string;
  data: GenericObjectType;
  namespaceId: string;
  projectId: string;
}
export async function newConfigMap(obj: IConfigMap) {
  assert(obj);
  obj.labels = obj.labels || {};
  obj.type = 'configMap';

  assert(obj.name, 'Missing configmap name');
  assert(Object.keys(obj.data).length, 'Config map details are not specified');

  const { data: newConfig } = await client.post(`projects/${obj.projectId}/configmap`, obj);
  return newConfig as IConfigMap;
}

export async function checkAndGetConfigMap(name: string, namespaceId: string, projectId: string) {
  assert(name, 'Missing configmap name');
  assert(namespaceId, 'Missing configmap namespaceId');
  assert(projectId, 'Missing configmap projectId');

  try {
    const { data: configMap } = await client.get(`projects/${projectId}/configMaps/${namespaceId}:${name}`);
    return configMap;
  } catch (error) {
    return null;
  }
}

export async function deleteConfigMap(name: string, namespaceId: string, projectId: string) {
  assert(name, 'Missing configmap name');
  assert(namespaceId, 'Missing configmap namespaceId');
  assert(projectId, 'Missing configmap projectId');

  const { data: configMap } = await client.delete(`projects/${projectId}/configMaps/${namespaceId}:${name}`);
  console.log('config map delete', configMap);
}

export async function cloneAndDeleteConfigMap(name: string, namespaceId: string, projectId: string) {
  assert(name, 'Missing configmap name');
  assert(namespaceId, 'Missing configmap namespaceId');
  assert(projectId, 'Missing configmap projectId');

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
