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
export declare function getAllDeployments(projectName: string): Promise<IDeployment[]>;
export declare function getAllWorkloads(projectName: string): Promise<IDeployment[]>;
export declare function update(deploymentObj: IDeployment): Promise<IDeployment>;
export declare function get(projectName: string, id: string): Promise<IDeployment>;
