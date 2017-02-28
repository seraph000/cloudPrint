import {remoteUrl} from "./url.js";
import {notification } from "antd";
require('es6-promise').polyfill();
require('isomorphic-fetch');

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
    if (res.status === 401) {
        location.href = '/401';
    }
    return res;
}

function check404(res) {
    if (res.status === 404) {
        return Promise.reject(errorMessages(res));
    }
    return res;
}
function jsonParse(res) {
    return res.json().then(json=> {
        return json
    });
}

function errorMessageParse(res) {
    const {success, result} = res;
    if (!success) {
        return Promise.reject(res.message);
    }
    return result;
}

function alertMessageParse(res) {
    const {success, result} = res;
    if (!success) {
        return Promise.reject(res.message);
    }
    return result;
}

function xFetch(url, options) {
    const opts = {...options};
    opts.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        ...opts.headers,
    };
    let method = opts.method.toLowerCase();
    return fetch(remoteUrl + url, {
        ...opts,
        body: method == 'get' || method == 'delete' ? null : JSON.stringify(opts.body),
        withCredentials: true,
    })
    .then(function (resp) {
      var obj = resp.json();
      if (resp.ok) {
        obj.then((data) => {

        });
      } else {
        obj.then((data) => {
          console.log(data)
          notification.error({
            message: '错误提示',
            description: data.error.message,
            duration: 2
          });
        });
      }
      return obj;
    });
  }

export default xFetch;
