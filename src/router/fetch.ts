enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

function queryStringify(data: Record<string, any>) {
  const str = `?${Object.keys(data)
    .reduce(function (a: string[], k: string) {
      a.push(`${k}=${data[k]}`);
      return a;
    }, [])
    .join('&')}`;
  return str;
}

type OptionType = {
  method: METHOD;
  data?: any;
};

class HTTPTransport {
  get = (url: string, options: Omit<OptionType, 'method'> = {}) => {
    return this.request(url, { ...options, method: METHOD.GET });
  };

  post = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  put = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  delete = (url: string, options = {}) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  request = (url: string, options: OptionType = { method: METHOD.GET }) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // xhr.open(method, url, true);
      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        data === undefined ? xhr.open(method, url) : xhr.open(method, url + queryStringify(data));
        xhr.send();
      } else {
        xhr.open(method, url);
        xhr.send(data);
      }
    });
  };
}

const api = new HTTPTransport();

export default function fetchWithRetry(url: string, options: any = {}): Promise<any> {
  function onError(err: Error) {
    if (options.retries > 1) {
      return fetchWithRetry(url, options.retries - 1);
    }
    throw err;

    return fetch(url, options);
  }

  return api.request(url, options).catch(onError);
}
