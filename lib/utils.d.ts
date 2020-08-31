import { Err } from './types';
export declare const client: import("axios").AxiosInstance;
export declare function getYMLFromGHRepo(path: string): Promise<string>;
export declare function createNewError(message: string, code: string): Err;
export declare function btoa(str: string): string;
