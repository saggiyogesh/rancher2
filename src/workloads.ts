import assert from 'assert';
import { getUniqueProject } from './project';
import { client } from './utils';

export interface IContainer {
  environment: {};
  image: string;
  imagePullPolicy: string;
  initContainer: boolean;
  name: string;
  ports: {
    containerPort: number;
    dnsName: string;
    hostPort: number;
    kind: string;
    name: string;
    protocol: string;
    sourcePort: number;
    type: string;
  }[];
  resources: {
    limits: {
      cpu: string;
      memory: string;
    };
    type: string;
  };
  restartCount: number;
  stdin: boolean;
  type: string;
}
export interface IDeployment {
  projectId: string;
  restartPolicy: string;
  namespaceId: string;
  scale: number;
  state: string;
  labels: {};
  name: string;
  type?: string;
  id: string;
  baseType: string;
  uuid: string;
  transitioning: string;
  transitioningMessage: string;
  containers: IContainer[];
}

async function getAll(projectName: string, type: string) {
  const project = await getUniqueProject(projectName);
  const { id: projectId } = project;

  const { data } = await client.get(`/project/${projectId}/${type}`);
  return (data.data as any) as Array<IDeployment>;
}

export async function getAllDeployments(projectName: string) {
  return getAll(projectName, 'deployments');
}

export async function getAllWorkloads(projectName: string) {
  return getAll(projectName, 'workloads');
}

export async function update(deploymentObj: IDeployment) {
  const { projectId, id } = deploymentObj;
  assert(projectId, 'Missing Project Id');
  assert(id, 'Missing Id');
  const { data } = await client.put(`project/${projectId}/workloads/${id}`, deploymentObj);
  return (data.data as any) as IDeployment;
}

export async function get(projectName: string, id: string) {
  const project = await getUniqueProject(projectName);
  const { id: projectId } = project;

  const { data } = await client.get(`project/${projectId}/workloads/${id}`);
  return (data.data as any) as IDeployment;
}
