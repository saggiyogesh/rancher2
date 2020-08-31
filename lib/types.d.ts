export interface Err extends Error {
    code?: string;
}
export declare type GenericObjectType<T = string> = {
    [k: string]: T;
};
