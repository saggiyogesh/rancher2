import axios, { AxiosRequestConfig } from 'axios';
import { Err } from './types';

// YML_REPO=saggiyogesh/rancher-ymls
// PAT=Github Personal token to pull ymls from private repo
const {
  RANCHER_SERVER_API,
  RANCHER_API_KEY,
  YML_REPO = 'saggiyogesh/rancher-ymls',
  PAT,
  YML_REPO_BRANCH = 'master',
} = process.env;

export const client = axios.create({
  baseURL: RANCHER_SERVER_API,
  timeout: 4000,
  headers: {
    Authorization: `Bearer ${RANCHER_API_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'rancher-node',
  },
});

export async function getYMLFromGHRepo(path: string) {
  const config: AxiosRequestConfig = {};
  if (PAT) {
    config.headers = {
      Authorization: `token ${PAT}`,
    };
  }
  const url = `https://raw.githubusercontent.com/${YML_REPO}/${YML_REPO_BRANCH}/${path}`;
  const { data } = await axios.get<string>(url, config);
  return data;
}

export function createNewError(message: string, code: string) {
  const e = new Error(message) as Err;
  e.code = code;
  return e;
}

export function btoa(str: string) {
  return Buffer.from(str, 'binary').toString('base64');
}
