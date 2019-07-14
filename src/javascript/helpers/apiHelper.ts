// const API_URL =
//   "https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/";

import APP_CONSTANTS from "./constants";

export type HTTPMethod = "POST" | "GET" | "PUT" | "DELETE";
export interface IHTTPOptions {
  method: HTTPMethod,
  body?: string, 
  headers?: Headers,
  mode?: string 
};

function callApi(endpoint: string, method: HTTPMethod, body?: string): Promise<any> {
  const url: string = APP_CONSTANTS.API_URL + endpoint;
  const headers: Headers = new Headers();
  headers.set("Content-type", "application/json");

  const options: IHTTPOptions = {
    method,
    body,
    headers,
    mode: "cors"
  };

  return fetch(url, options as RequestInit)
    .then((response: Response): Promise<JSON> => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(Error("Failed to load"));
      }
    })
    .catch(error => {
      throw error;
    });
}

export { callApi };
