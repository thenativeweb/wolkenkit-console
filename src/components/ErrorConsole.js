import Button from './Button';
import fakeConsole from '../actions/util/fakeConsole';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import './ErrorConsole.css';

class ErrorConsole extends Component {
  static renderMessage (error, index) {
    if (error instanceof Error) {
      if (error.name === 'CommandRejected') {
        return (
          <div key={ index } className='wk-message'>
            <h3>Command got rejected: {error.message}</h3>
          </div>
        );
      }

      return (
        <div key={ index } className='wk-message'>
          <h3>Error: {error.message}</h3>
          <p>{error.stack}</p>
        </div>
      );
    }

    return (
      <div key={ index } className='wk-message'>
        <h3>{error}</h3>
      </div>
    );
  }

  static handleClearClicked (event) {
    event.preventDefault();

    fakeConsole.clear();
  }

  constructor () {
    super();

    this.saveContainerRef = this.saveContainerRef.bind(this);
    this.handleExpandClicked = this.handleExpandClicked.bind(this);
    this.handleCloseClicked = this.handleCloseClicked.bind(this);

    this.state = {
      isExpanded: false
    };
  }

  handleExpandClicked () {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  handleCloseClicked () {
    this.setState({
      isExpanded: false
    });
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  render () {
    if (!fakeConsole.messages) {
      return null;
    }

    let className = 'wk-error-console';

    if (this.state.isExpanded) {
      className += ' wk-error-console--expanded';
    }

    return (
      <div className={ className }>
        <div className='wk-error-console__header'>
          <Button type='link' onClick={ this.handleExpandClicked }>Logs and Errors: ({fakeConsole.messages.length})</Button>
          <Button type='link' onClick={ ErrorConsole.handleClearClicked }>Clear</Button>
          <div className='wk-spacer' />
          { this.state.isExpanded ? <Button type='link' onClick={ this.handleCloseClicked }>Close</Button> : null }
        </div>
        <div className='wk-error-console__messages' ref={ this.saveContainerRef }>
          { fakeConsole.messages.length === 0 ? <div className='wk-hint'>No errors encountered yet. Well done!</div> : '' }

          {
            /* eslint-disable no-extra-parens */
            fakeConsole.messages.map(ErrorConsole.renderMessage)
            /* eslint-enable no-extra-parens */
          }
        </div>
      </div>
    );
  }
}

export default observer(ErrorConsole);
