import tryToConnect from './tryToConnect';

const handleConnectFormSubmitted = async function (event) {
  event.preventDefault();

  await tryToConnect();
};

export default handleConnectFormSubmitted;
