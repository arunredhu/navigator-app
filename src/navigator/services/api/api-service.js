import ERROR_MSG from '../../config/error.js';

const errorMsg = Object.create(ERROR_MSG);

// function to extract data from any URL
export const fetchApiData = (URL, type, param = '', body = {}) => {
  const POST = 'POST';
  const config = { 'method': type }

  if (type === POST)
    config['body'] = body;

  return fetch(URL+param, config)
      .then(handleErrors)
      .then(res => { return res.json(); })
      .then(res => { return res; })
      .catch((e) => { return errorMsg.API_SERVER_ERROR; });
}

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}