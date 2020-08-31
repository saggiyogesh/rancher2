import assert from 'assert';
import { AxiosError } from 'axios';
import { template } from 'lodash';

import { client, createNewError } from './utils';

export interface ICluster {
  name: string;
  id: string;
  description?: string;
  type: string;
}

export async function getCluster(clusterName: string) {
  assert(clusterName, 'Missing Cluster name');
  const { data } = await client.get(`/clusters?name=${clusterName}`);
  return (data.data as any) as Array<ICluster>;
}

export async function getUniqueCluster(clusterName: string) {
  const clusterArr = await getCluster(clusterName);
  if (clusterArr.length > 1) {
    throw createNewError(`Found ${clusterArr.length} clusters with name: ${clusterName}`, 'MULTIPLE_CLUSTERS');
  }

  if (!clusterArr.length) {
    throw createNewError(`No cluster found with name: ${clusterName}`, 'INVALID_CLUSTER_NAME');
  }

  return clusterArr[0];
}

export async function getKubeConfig(clusterId: string) {
  assert(clusterId, 'Missing Cluster Id');
  const { data } = await client.post(`/clusters/${clusterId}?action=generateKubeconfig`);
  return data.config;
}

export interface INamespace {
  clusterId: string;
  labels?: {};
  name: string;
  projectId: string;
  resourceQuota?: {} | null;
  type?: string;
}

export async function newNamespace(obj: INamespace) {
  assert(obj, 'Missing Namespace input object');
  const { clusterId } = obj;
  obj.resourceQuota = obj.resourceQuota || null;
  obj.labels = obj.labels || {};
  obj.type = 'namespace';
  assert(clusterId, 'Missing Cluster Id');
  assert(obj.name, 'Missing Namespace name');
  assert(obj.projectId, 'Missing Project Id');

  const { data: newNS } = await client.post(`/clusters/${clusterId}/namespace`, obj);
  return newNS;
}

export async function getNamespace(namespaceName: string, clusterId: string) {
  assert(clusterId, 'Missing Cluster Id');
  assert(namespaceName, 'Missing Namespace name');
  try {
    const { data } = await client.get(`clusters/${clusterId}/namespaces/${namespaceName}`);
    return data;
  } catch (err) {
    const e = err as AxiosError;
    if (e.response?.status === 404) {
      return null;
    }

    throw e;
  }
}

export async function createNamespaceIfNotExists(namespaceName: string, clusterId: string, projectId: string) {
  let ns = await getNamespace(namespaceName, clusterId);
  if (!ns) {
    ns = await newNamespace({ name: namespaceName, clusterId, projectId });
  }
  return ns;
}

export async function importYAML(clusterId: string, namespace: string, yaml: string) {
  assert(clusterId, 'Missing Cluster Id');
  assert(namespace, 'Missing Namespace name');
  assert(yaml, 'Missing yml');
  console.log('yaml--', yaml);

  const { data } = await client.post(`clusters/${clusterId}?action=importYaml`, {
    defaultNamespace: namespace,
    yaml,
  });
}

export async function convertTemplateAndImport(clusterId: string, namespace: string, tmpl: string, tmplData?: object) {
  assert(clusterId, 'Missing Cluster Id');
  assert(namespace, 'Missing Namespace name');
  assert(tmpl, 'Missing yml template');
  assert(tmplData, 'Missing yml tmpl data');
  const compiled = template(tmpl);
  await importYAML(clusterId, namespace, compiled(tmplData));
}
