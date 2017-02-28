import xFetch from '../utils/xFetch.js';

export async function getPrice(options) {
  return await xFetch('/Webapi/Config/GetConfigByIdentity', options);
}

export async function editPrice(options) {
  return await xFetch(`/Webapi/Config/edite`, options)
}
