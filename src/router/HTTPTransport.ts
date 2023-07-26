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

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(url = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + url);
  }

  public post<Response = void>(url: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { data, method: METHOD.POST });
  }

  public put<Response = void>(url: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { data, method: METHOD.PUT });
  }

  public delete<Response>(url: string): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { method: METHOD.DELETE });
  }

  private request<Response>(
    url: string,
    options: OptionType = { method: METHOD.GET }
  ): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      //@ts-expect-error
      xhr.onreadystatechange = (e) => {
        
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
