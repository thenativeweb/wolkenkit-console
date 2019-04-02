import { Button } from 'thenativeweb-ux';
import classNames from 'classnames';
import debugging from '../actions/debugging';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';

const styles = theme => ({
  ErrorConsole: {
    overflow: 'hidden',
    display: 'flex',
    'flex-direction': 'column',
    height: 0,
    transition: 'height 200ms ease-in-out',
    'will-change': 'height',

    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      height: 1,
      background: '#eee'
    }
  },

  IsExpanded: {
    height: '300px'
  },

  Header: {
    height: 48,
    'flex-grow': 0,
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    padding: [ 0, theme.grid.stepSize ],
    'border-bottom': '1px solid #eee'
  },

  HeaderSpacer: {
    'flex-grow': 1
  },

  Messages: {
    overflow: 'auto',
    'flex-grow': 1,
    'font-family': theme.font.family.code,
    'font-size': theme.font.size.small
  },

  Message: {
    padding: [ theme.grid.stepSize, theme.grid.stepSize * 2 ],
    'border-bottom': '1px solid #eee'
  },

  MessageContent: {
    'font-size': theme.font.size.small,
    'word-break': 'break-all'
  },

  Hint: {
    'font-size': theme.font.size.small,
    padding: theme.grid.stepSize * 2
  }
});

class ErrorConsole extends React.Component {
  static handleClearClicked (event) {
    event.preventDefault();

    debugging.clear();
  }

  static handleCloseClicked (event) {
    event.preventDefault();

    debugging.hideErrorConsole();
  }

  constructor () {
    super();

    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage (error, index) {
    const { classes } = this.props;

    let content;

    if (error.message && error.name) {
      content = <React.Fragment><h3>Error: {error.message}</h3><p>{error.stack}</p></React.Fragment>;

      if (error.name === 'CommandRejected' || error.name === 'CommandFailed') {
        content = <div className={ classes.MessageContent }>Command got rejected: {error.message}</div>;
      }
    } else if (typeof error === 'object') {
      content = <div className={ classes.MessageContent }>{JSON.stringify(error)}</div>;
    } else {
      content = <div className={ classes.MessageContent }>{error}</div>;
    }

    return (
      <div key={ index } className={ classes.Message }>
        { content }
      </div>
    );
  }

  render () {
    const { classes } = this.props;

    if (!state.debugging.messages) {
      return null;
    }

    const componentClasses = classNames(classes.ErrorConsole, {
      [classes.IsExpanded]: state.debugging.errorConsoleVisible
    });

    return (
      <div className={ componentClasses }>
        <div className={ classes.Header }>
          <Button icon='clear' isSubtle={ true } onClick={ ErrorConsole.handleClearClicked }>Clear</Button>
          <div className={ classes.HeaderSpacer } />
          <Button icon='close' isSubtle={ true } onClick={ ErrorConsole.handleCloseClicked } />
        </div>
        <div className={ classes.Messages }>
          { state.debugging.messages.length === 0 ? <div className={ classes.Hint }>No errors encountered yet. Well done!</div> : '' }

          {
            state.debugging.messages.map(this.renderMessage)
          }
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(ErrorConsole));
