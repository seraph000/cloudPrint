import xFetch from '../utils/xFetch.js';

export async function getListById(options) {
  return await xFetch(`/WebApi/Device/GetDeviceRecordPagedList`, options);
}
