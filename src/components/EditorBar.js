import Button from './Button';
import React, { Component } from 'react';
import './EditorBar.css';

class EditorBar extends Component {
  constructor () {
    super();

    this.handleContextChanged = this.handleContextChanged.bind(this);
    this.handleAggregateChanged = this.handleAggregateChanged.bind(this);
    this.handleCommandChanged = this.handleCommandChanged.bind(this);
    this.handleInsertCommandClicked = this.handleInsertCommandClicked.bind(this);

    this.state = {
      selectedContext: undefined,
      selectedAggregate: undefined,
      selectedCommand: undefined
    };
  }

  handleContextChanged (event) {
    this.setState({
      selectedContext: event.target.value
    });
  }

  handleAggregateChanged (event) {
    this.setState({
      selectedAggregate: event.target.value
    });
  }

  handleCommandChanged (event) {
    this.setState({
      selectedCommand: event.target.value
    });
  }

  handleInsertCommandClicked () {
    const { onInsertCommandClick } = this.props;
    const { selectedContext, selectedAggregate, selectedCommand } = this.state;

    onInsertCommandClick({
      context: selectedContext,
      aggregate: selectedAggregate,
      command: selectedCommand
    });
  }

  renderBuildButton () {
    const { selectedCommand } = this.state;

    if (!selectedCommand) {
      return null;
    }

    return (
      <Button type='small' onClick={ this.handleInsertCommandClicked }>Insert</Button>
    );
  }

  renderCommands () {
    const { configuration } = this.props;
    const { selectedAggregate, selectedContext } = this.state;

    if (!configuration || !selectedContext || !selectedAggregate) {
      return null;
    }

    const commands = configuration.writeModel[selectedContext][selectedAggregate].commands;

    return (
      <div className='wk-dropdown'>
        <select key='commands' onChange={ this.handleCommandChanged }>
          <option value=''>Choose command…</option>
          {
            Object.keys(commands).map(commandName =>
              <option key={ commandName } value={ commandName }>{commandName}</option>
            )
          }
        </select>
      </div>
    );
  }

  renderAggregates () {
    const { configuration } = this.props;
    const { selectedContext } = this.state;

    if (!configuration || !selectedContext) {
      return null;
    }

    const aggregates = configuration.writeModel[selectedContext];

    return (
      <div className='wk-dropdown'>
        <select key='aggregates' onChange={ this.handleAggregateChanged }>
          <option value=''>Choose aggregate…</option>
          {
            Object.keys(aggregates).map(aggreateName =>
              <option key={ aggreateName } value={ aggreateName }>{aggreateName}</option>
            )
          }
        </select>
      </div>
    );
  }

  renderCommandBuilder () {
    const { configuration } = this.props;

    if (!configuration) {
      return null;
    }

    return (
      <div className='wk-command-builder'>
        <div className='wk-label'>Build a command</div>
        <div className='wk-controls'>
          <div className='wk-dropdown'>
            <select key='contexts' onChange={ this.handleContextChanged }>
              <option value=''>Choose context…</option>
              {
                Object.keys(configuration.writeModel).map(contextName =>
                  <option key={ contextName } value={ contextName }>{contextName}</option>
                )
              }
            </select>
          </div>
          {this.renderAggregates()}
          {this.renderCommands()}
          {this.renderBuildButton()}
        </div>
      </div>
    );
  }

  render () {
    const { configuration } = this.props;

    if (!configuration) {
      return null;
    }

    return (
      <div className='wk-editor-bar'>{ this.renderCommandBuilder() }</div>
    );
  }
}

export default EditorBar;
