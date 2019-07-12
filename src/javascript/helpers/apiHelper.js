// const API_URL =
//   "https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/";

import APP_CONSTANTS from "./constants";

function callApi(endpoint, method, body) {
  const url = APP_CONSTANTS.LOCAL_API_URL + endpoint;
  const headers = new Headers();
  headers.set("Content-type", "application/json");

  const options = {
    method,
    body,
    headers,
    mode: "cors"
  };

  return fetch(url, options)
    .then(response => {
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
