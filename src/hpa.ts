import { getUniqueProject } from './project';
import { client } from './utils';

export interface IHPA {
  projectId: string;
  namespaceId: string;
  currentReplicas: number;
  desiredReplicas: number;
  maxReplicas: number;
  minReplicas: number;
  state: string;
  labels: {};
  name: string;
  type?: string;
  id: string;
  workloadId: string;
  uuid: string;
  transitioning: string;
  transitioningMessage: string;
}

export async function getAll(projectName: string) {
  const project = await getUniqueProject(projectName);
  const { id: projectId } = project;

  const { data } = await client.get(`/project/${projectId}/horizontalpodautoscalers`);
  return (data.data as any) as Array<IHPA>;
}

export async function update(hpaObj: IHPA) {
  const { projectId, id } = hpaObj;
  const { data } = await client.put(`/project/${projectId}/horizontalPodAutoscalers/${id}`);
  return (data.data as any) as IHPA;
}
