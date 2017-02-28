import xFetch from '../utils/xFetch.js';

export async function getList(options) {
  return await xFetch(`/WebApi/DataSynnc/GetDataSyncPagedList`, options)
}
