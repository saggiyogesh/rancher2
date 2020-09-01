import { hpa } from './main';
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
export declare function getAll(projectName: string): Promise<hpa.IHPA[]>;
export declare function update(hpaObj: IHPA): Promise<hpa.IHPA>;
