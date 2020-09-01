import assert from 'assert';
import * as cluster from './cluster';
import * as project from './project';
import * as customApps from './customApps/main';
import * as hpa from './hpa';
import * as pods from './pods';
import * as workloads from './workloads';

const { RANCHER_API_KEY, RANCHER_SERVER_API } = process.env;

assert(RANCHER_API_KEY, 'Missing env var RANCHER_API_KEY');
assert(RANCHER_SERVER_API, 'Missing env var RANCHER_SERVER_API');

export { cluster, project, customApps, hpa, pods, workloads };

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
