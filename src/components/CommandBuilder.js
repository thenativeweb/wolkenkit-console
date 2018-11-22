import injectSheet from 'react-jss';
import { Button, Dropdown, Text } from 'thenativeweb-ux';
import React, { useState } from 'react';

const styles = theme => ({
  CommandBuilder: {
    'flex-grow': 1,
    'flex-shrink': 1,
    display: 'flex',
    'flex-direction': 'row'
  },

  Label: {
    'flex-grow': 0,
    'flex-shrink': 0,
    'margin-right': theme.grid.stepSize
  },

  Controls: {
    'flex-grow': 1,
    display: 'flex',
    'align-items': 'center',
    'flex-wrap': 'wrap'
  }
});

const CommandChooser = function ({ commands, selectedCommand, onChange }) {
  if (!commands) {
    return null;
  }

  return (
    <Dropdown
      size='s'
      style={{ flexGrow: 1 }}
      options={ commands.map(command => ({ label: command, value: command })) }
      value={ selectedCommand }
      onChange={ onChange }
    />
  );
};

const AggregateChooser = function ({ aggregates, selectedAggregate, onChange }) {
  if (!aggregates) {
    return null;
  }

  return (
    <Dropdown
      size='s'
      style={{ flexGrow: 1 }}
      options={ aggregates.map(aggregate => ({ label: aggregate, value: aggregate })) }
      value={ selectedAggregate }
      onChange={ onChange }
    />
  );
};

const getAggregatesNamesForContext = function ({ writeModel, selectedContext }) {
  return Object.keys(writeModel[selectedContext]);
};

const getCommandNamesForAggregate = function ({ writeModel, selectedContext, selectedAggregate }) {
  if (!selectedContext || !selectedAggregate) {
    return;
  }

  return Object.keys(writeModel[selectedContext][selectedAggregate].commands);
};

const CommandBuilder = function ({ classes, configuration, onInsertCommandClick }) {
  if (!configuration) {
    return null;
  }

  const { writeModel } = configuration;

  const contexts = Object.keys(writeModel);
  const [ selectedContext, setContext ] = useState(contexts[0]);

  let aggregates = getAggregatesNamesForContext({ writeModel, selectedContext });
  const [ selectedAggregate, setAggregate ] = useState(aggregates[0]);

  let commands = getCommandNamesForAggregate({ writeModel, selectedContext, selectedAggregate });
  const [ selectedCommand, setCommand ] = useState(commands[0]);

  const handleContextChange = function (newContext) {
    setContext(newContext);

    aggregates = getAggregatesNamesForContext({ writeModel, selectedContext: newContext });

    const firstAggregate = aggregates[0];

    setAggregate(firstAggregate);

    commands = getCommandNamesForAggregate({ writeModel, selectedContext: newContext, selectedAggregate: firstAggregate });
    setCommand(commands[0]);
  };

  const handleAggregateChanged = function (newAggregate) {
    setAggregate(newAggregate);

    commands = getCommandNamesForAggregate({ writeModel, selectedContext, selectedAggregate: newAggregate });
    setCommand(commands[0]);
  };

  const handleCommandChanged = function (newCommand) {
    setCommand(newCommand);
  };

  const handleInsertClicked = function () {
    onInsertCommandClick({
      context: selectedContext,
      aggregate: selectedAggregate,
      command: selectedCommand
    });
  };

  /* eslint-disable react/jsx-no-bind */
  return (
    <div className={ classes.CommandBuilder }>
      <Text className={ classes.Label }>Build a command</Text>
      <div className={ classes.Controls }>
        <Dropdown
          size='s'
          style={{ flexGrow: 1 }}
          options={ contexts.map(context => ({ label: context, value: context })) }
          value={ selectedContext }
          onChange={ handleContextChange }
        />
        <AggregateChooser
          aggregates={ aggregates }
          selectedAggregate={ selectedAggregate }
          onChange={ handleAggregateChanged }
        />
        <CommandChooser
          commands={ commands }
          selectedCommand={ selectedCommand }
          onChange={ handleCommandChanged }
        />
        <Button
          size='s'
          isPrimary={ true }
          className={ classes.FlexControl }
          onClick={ handleInsertClicked }
        >
          Insert
        </Button>
      </div>
    </div>
  );
  /* eslint-enable react/jsx-no-bind */
};

export default injectSheet(styles)(CommandBuilder);
