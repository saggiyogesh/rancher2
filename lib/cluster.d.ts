export interface ICluster {
    name: string;
    id: string;
    description?: string;
    type: string;
}
export declare function getCluster(clusterName: string): Promise<ICluster[]>;
export declare function getUniqueCluster(clusterName: string): Promise<ICluster>;
export declare function getKubeConfig(clusterId: string): Promise<any>;
export interface INamespace {
    clusterId: string;
    labels?: {};
    name: string;
    projectId: string;
    resourceQuota?: {} | null;
    type?: string;
}
export declare function newNamespace(obj: INamespace): Promise<any>;
export declare function getNamespace(namespaceName: string, clusterId: string): Promise<any>;
export declare function createNamespaceIfNotExists(namespaceName: string, clusterId: string, projectId: string): Promise<any>;
export declare function importYAML(clusterId: string, namespace: string, yaml: string): Promise<void>;
export declare function convertTemplateAndImport(clusterId: string, namespace: string, tmpl: string, tmplData?: object): Promise<void>;
