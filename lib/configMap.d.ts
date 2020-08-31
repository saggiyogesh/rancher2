import { GenericObjectType } from './types';
export interface IConfigMap {
    labels?: {};
    name: string;
    type?: string;
    data: GenericObjectType;
    namespaceId: string;
    projectId: string;
}
export declare function newConfigMap(obj: IConfigMap): Promise<IConfigMap>;
export declare function checkAndGetConfigMap(name: string, namespaceId: string, projectId: string): Promise<any>;
export declare function deleteConfigMap(name: string, namespaceId: string, projectId: string): Promise<void>;
export declare function cloneAndDeleteConfigMap(name: string, namespaceId: string, projectId: string): Promise<void>;
