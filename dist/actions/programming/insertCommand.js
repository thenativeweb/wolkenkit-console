import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    /*\n     * Use the 'app' object to access your backend.\n     *\n     * Documentation:\n     * https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/\n     *\n     * Slack:\n     * http://slackin.wolkenkit.io/\n     *\n     * StackOverflow:\n     * https://stackoverflow.com/questions/tagged/wolkenkit\n     */\n\n    app.", ".", "().", "().\n      failed(console.log);"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import state from '../../state';
import stripIndent from 'common-tags/lib/stripIndent';

var insertCommand = function insertCommand(command) {
  if (!command) {
    throw new Error('Command is missing.');
  }

  state.programming.code = stripIndent(_templateObject(), command.context, command.aggregate, command.command);
};

export default insertCommand;