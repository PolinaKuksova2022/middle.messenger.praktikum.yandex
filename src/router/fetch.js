const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  let str =
    '?' +
    Object.keys(data)
      .reduce(function (a, k) {
        a.push(k + '=' + data[k]);
        return a;
      }, [])
      .join('&');
  return str;
}

class HTTPTransport {
  get = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url, options, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // xhr.open(method, url, true);
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        data == undefined ? xhr.open(method, url) : xhr.open(method, url + queryStringify(data));
        xhr.send();
      } else {
        xhr.open(method, url);
        xhr.send(data);
      }
    });
  };
}
