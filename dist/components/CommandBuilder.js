import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import injectSheet from 'react-jss';
import { Button, Dropdown, Text } from 'thenativeweb-ux';
import React, { useState } from 'react';

var styles = function styles(theme) {
  return {
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
    },
    Control: {
      'margin-bottom': theme.grid.stepSize
    }
  };
};

var CommandChooser = function CommandChooser(_ref) {
  var commands = _ref.commands,
      selectedCommand = _ref.selectedCommand,
      onChange = _ref.onChange;

  if (!commands) {
    return null;
  }

  return React.createElement(Dropdown, {
    size: "s",
    style: {
      flexGrow: 1,
      marginBottom: 5
    },
    options: commands.map(function (command) {
      return {
        label: command,
        value: command
      };
    }),
    value: selectedCommand,
    onChange: onChange
  });
};

var AggregateChooser = function AggregateChooser(_ref2) {
  var aggregates = _ref2.aggregates,
      selectedAggregate = _ref2.selectedAggregate,
      onChange = _ref2.onChange;

  if (!aggregates) {
    return null;
  }

  return React.createElement(Dropdown, {
    size: "s",
    style: {
      flexGrow: 1,
      marginBottom: 5
    },
    options: aggregates.map(function (aggregate) {
      return {
        label: aggregate,
        value: aggregate
      };
    }),
    value: selectedAggregate,
    onChange: onChange
  });
};

var getAggregatesNamesForContext = function getAggregatesNamesForContext(_ref3) {
  var writeModel = _ref3.writeModel,
      selectedContext = _ref3.selectedContext;
  return Object.keys(writeModel[selectedContext]);
};

var getCommandNamesForAggregate = function getCommandNamesForAggregate(_ref4) {
  var writeModel = _ref4.writeModel,
      selectedContext = _ref4.selectedContext,
      selectedAggregate = _ref4.selectedAggregate;

  if (!selectedContext || !selectedAggregate) {
    return;
  }

  return Object.keys(writeModel[selectedContext][selectedAggregate].commands);
};

var CommandBuilder = function CommandBuilder(_ref5) {
  var classes = _ref5.classes,
      configuration = _ref5.configuration,
      onInsertCommandClick = _ref5.onInsertCommandClick;

  if (!configuration) {
    return null;
  }

  var writeModel = configuration.writeModel;
  var contexts = Object.keys(writeModel);

  var _useState = useState(contexts[0]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedContext = _useState2[0],
      setContext = _useState2[1];

  var aggregates = getAggregatesNamesForContext({
    writeModel: writeModel,
    selectedContext: selectedContext
  });

  var _useState3 = useState(aggregates[0]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedAggregate = _useState4[0],
      setAggregate = _useState4[1];

  var commands = getCommandNamesForAggregate({
    writeModel: writeModel,
    selectedContext: selectedContext,
    selectedAggregate: selectedAggregate
  });

  var _useState5 = useState(commands[0]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedCommand = _useState6[0],
      setCommand = _useState6[1];

  var handleContextChange = function handleContextChange(newContext) {
    setContext(newContext);
    aggregates = getAggregatesNamesForContext({
      writeModel: writeModel,
      selectedContext: newContext
    });
    var firstAggregate = aggregates[0];
    setAggregate(firstAggregate);
    commands = getCommandNamesForAggregate({
      writeModel: writeModel,
      selectedContext: newContext,
      selectedAggregate: firstAggregate
    });
    setCommand(commands[0]);
  };

  var handleAggregateChanged = function handleAggregateChanged(newAggregate) {
    setAggregate(newAggregate);
    commands = getCommandNamesForAggregate({
      writeModel: writeModel,
      selectedContext: selectedContext,
      selectedAggregate: newAggregate
    });
    setCommand(commands[0]);
  };

  var handleCommandChanged = function handleCommandChanged(newCommand) {
    setCommand(newCommand);
  };

  var handleInsertClicked = function handleInsertClicked() {
    onInsertCommandClick({
      context: selectedContext,
      aggregate: selectedAggregate,
      command: selectedCommand
    });
  };
  /* eslint-disable react/jsx-no-bind */


  return React.createElement("div", {
    className: classes.CommandBuilder
  }, React.createElement(Text, {
    className: classes.Label
  }, "Build a command"), React.createElement("div", {
    className: classes.Controls
  }, React.createElement(Dropdown, {
    size: "s",
    style: {
      flexGrow: 1,
      marginBottom: 5
    },
    options: contexts.map(function (context) {
      return {
        label: context,
        value: context
      };
    }),
    value: selectedContext,
    onChange: handleContextChange
  }), React.createElement(AggregateChooser, {
    aggregates: aggregates,
    selectedAggregate: selectedAggregate,
    onChange: handleAggregateChanged
  }), React.createElement(CommandChooser, {
    commands: commands,
    selectedCommand: selectedCommand,
    onChange: handleCommandChanged
  }), React.createElement(Button, {
    size: "s",
    style: {
      flexGrow: 1,
      marginBottom: 5
    },
    isPrimary: true,
    className: classes.FlexControl,
    onClick: handleInsertClicked
  }, "Insert")));
  /* eslint-enable react/jsx-no-bind */
};

export default injectSheet(styles)(CommandBuilder);