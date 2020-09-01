import { getUniqueProject } from './project';
import { client } from './utils';

export interface IPods {
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
  status: {
    conditions: {
      lastProbeTime: null;
      lastTransitionTime: string;
      lastTransitionTimeTS: number;
      message: string;
      reason: string;
      status: string;
      type: string;
    }[];
    phase: string;
    qosClass: string;
    type: string;
  };
}

export async function getAll(projectName: string, type: string) {
  const project = await getUniqueProject(projectName);
  const { id: projectId } = project;

  const { data } = await client.get(`/project/${projectId}/pods`);
  return (data.data as any) as Array<IPods>;
}

export async function get(projectName: string, id: string) {
  const project = await getUniqueProject(projectName);
  const { id: projectId } = project;

  const { data } = await client.get(`project/${projectId}/pods/${id}`);
  return (data.data as any) as IPods;
}
