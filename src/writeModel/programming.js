import program from '../readModel/program';
import sandbox from '../sandbox';

const editCode = function (newCode) {
  if (!newCode) {
    throw new Error('Code is missing.');
  }

  program.code = newCode;
};

const insertCommand = function (command) {
  if (!command) {
    throw new Error('Command is missing.');
  }

  program.code = `/*
* Use the 'app' object to access your backend.
* For details on how to send commands see…
* https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/
*/
app.${command.context}.${command.aggregate}().${command.command}().
failed(console.log);`;
};

const executeCode = function () {
  sandbox.execute(program.code);
};

export {
  editCode,
  executeCode,
  insertCommand
};
