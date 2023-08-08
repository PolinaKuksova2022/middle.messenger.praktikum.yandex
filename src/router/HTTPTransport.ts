enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
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

  public delete<Response>(url: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { data, method: METHOD.DELETE });
  }

  private request<Response>(
    url: string,
    options: OptionType = { method: METHOD.GET }
  ): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject();
      xhr.onerror = () => reject();
      xhr.ontimeout = () => reject();

      if (!url.includes('avatar')) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (url.includes('avatar')) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
