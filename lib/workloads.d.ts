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
}
export declare function getAllDeployments(projectName: string): Promise<IDeployment[]>;
export declare function getAllWorkloads(projectName: string): Promise<IDeployment[]>;
export declare function update(deploymentObj: IDeployment): Promise<IDeployment>;
export declare function get(projectName: string, id: string): Promise<IDeployment>;
