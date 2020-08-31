import { GenericObjectType } from './types';
export interface IProject {
    clusterId: string;
    enableProjectMonitoring?: boolean;
    labels: {};
    name: string;
    type?: string;
    id: string;
}
export declare function getProjectByNameAndClusterId(projectName: string, clusterId: string): Promise<IProject[]>;
export declare function getProject(projectName: string): Promise<IProject[]>;
export declare function newProject(obj: IProject): Promise<IProject>;
export interface IRegistrySecret {
    name: string;
    projectId: string;
    type?: string;
    registries: {
        [registry: string]: {
            username: string;
            password: string;
        };
    };
}
export declare function addRegistrySecret(obj: IRegistrySecret): Promise<any>;
export declare function getUniqueProject(projectName: string): Promise<IProject>;
export interface IApps {
    name: string;
    targetNamespace: string;
    catalogId: string;
    template: string;
    version: string;
    description?: string;
    labels?: Object;
    annotations?: Object;
    valuesYaml?: string;
    id: string;
}
export declare function getApp(name: string, projectId: string): Promise<IApps[]>;
export declare function deployApp(projectName: string, obj: Omit<IApps, 'id'>): Promise<any>;
export interface ISecret {
    projectId: string;
    labels?: {};
    name: string;
    type?: string;
    id: string;
    data: GenericObjectType;
}
export declare function getSecret(secretName: string, projectId: string): Promise<ISecret[]>;
export declare function newSecret(obj: Omit<ISecret, 'id'>): Promise<ISecret>;
