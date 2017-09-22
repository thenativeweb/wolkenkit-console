import state from '../../state';
import stripIndent from 'common-tags/lib/stripIndent';

const insertCommand = function (command) {
  if (!command) {
    throw new Error('Command is missing.');
  }

  state.programming.code = stripIndent`
    /*
     * Use the 'app' object to access your backend.
     *
     * Documentation:
     * https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/
     *
     * Slack:
     * http://slackin.wolkenkit.io/
     *
     * StackOverflow:
     * https://stackoverflow.com/questions/tagged/wolkenkit
     */

    app.${command.context}.${command.aggregate}().${command.command}().
      failed(console.log);`;
};

export default insertCommand;
