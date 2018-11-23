import axios from 'axios';

const loadConfiguration = async function (options) {
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

  const response = await axios.get(`https://${host}:${port}/v1/configuration.json`);

  return response.data;
};

export default loadConfiguration;
