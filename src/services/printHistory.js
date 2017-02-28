import xFetch from '../utils/xFetch.js';

export async function getList(options) {
  return await xFetch(`/WebApi/Device/GetDeviceList`, options);
}

export async function edit(options) {
  return await xFetch(`/Webapi/Device/edite`, options);
}
