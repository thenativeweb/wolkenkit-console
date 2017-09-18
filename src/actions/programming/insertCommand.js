import state from '../../state';
import stripIndent from 'common-tags/lib/stripIndent';

const insertCommand = function (command) {
  if (!command) {
    throw new Error('Command is missing.');
  }

  state.programming.code = stripIndent`
    /*
     * Use the 'app' object to access your backend.
     * For details on how to send commands see…
     * https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/
     */
    app.${command.context}.${command.aggregate}().${command.command}().
      failed(console.log);`;
};

export default insertCommand;
