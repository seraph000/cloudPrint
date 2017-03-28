import xFetch from '../utils/xFetch.js';

export async function getList(options) {
  return await xFetch(`/webapi/device/query`, options);
}

export async function update(options) {
  return await xFetch(`/webapi/device/add`, options);
}
