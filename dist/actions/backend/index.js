import connect from './connect';
import disconnect from './disconnect';
import handleDisconnectClicked from './handleDisconnectClicked';
import handleReconnectClicked from './handleReconnectClicked';
import resetState from './resetState';
export default {
  connect: connect,
  disconnect: disconnect,
  handleDisconnectClicked: handleDisconnectClicked,
  handleReconnectClicked: handleReconnectClicked,
  resetState: resetState
};
export { connect, disconnect, handleDisconnectClicked, handleReconnectClicked, resetState };