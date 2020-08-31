export interface Err extends Error {
  code?: string;
}

export type GenericObjectType<T = string> = {
  [k: string]: T;
};
