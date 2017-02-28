import xFetch from '../utils/xFetch.js';

export async function login(options) {
  return await xFetch(`/WebApi/Account/Login`, options);
}

export async function modify(options) {
  return await xFetch(`/WebApi/Account/ModifyPwd`, options)
}
