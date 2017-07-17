import superagent from 'superagent';

const request = superagent;

const loadConfiguration = function (options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.host) {
    throw new Error('Host is missing.');
  }
  if (!options.port) {
    throw new Error('Port is missing.');
  }

  const { host, port } = options;

  return new Promise((resolve, reject) => {
    request.
      get(`https://${host}:${port}/v1/configuration.json`).
      end((err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res.body);
      });
  });
};

export default loadConfiguration;
