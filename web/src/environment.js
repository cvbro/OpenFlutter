import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables
) {
  const request = {
    method: 'POST',
    headers: {},
  }
  if (uploadables) {
    if (!window.FormData) {
      throw new Error('Uploading files without `FormData` not supported.');
    }

    const formData = new FormData();
    formData.append('query', operation.text);
    formData.append('variables', JSON.stringify(variables));

    Object.keys(uploadables).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
        formData.append(`uploadables[${key}]`, uploadables[key]);
      }
    })

    request.body = formData
  } else {
    request.headers['Content-Type'] = 'application/json';
    request.body = JSON.stringify({
      query: operation.text,
      variables,
    })
  }
  console.log('process.env.SERVER_URL', process.env.SERVER_URL)
  return fetch(process.env.SERVER_URL, request).then(response => {
    return response.json();
  }).catch(error => {
    console.log(error);
  })
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),  
});

export default environment;
