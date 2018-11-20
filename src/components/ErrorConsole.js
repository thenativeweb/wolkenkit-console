import classNames from 'classnames';
import debugging from '../actions/debugging';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';
import { Button, View } from 'thenativeweb-ux';

const styles = theme => ({
  ErrorConsole: {
    overflow: 'hidden',
    display: 'flex',
    'flex-direction': 'column',
    'border-top': '1px solid #eee',
    height: 48,
    transition: 'height 200ms ease-in-out',
    'will-change': 'height'
  },

  IsExpanded: {
    height: '300px'
  },

  Link: {
    background: 'transparent',
    color: theme.color.brand.highlight,
    border: 0,

    '&:active, &:focus': {
      background: 'transparent',
      color: theme.color.brand.highlight
    }
  },

  Header: {
    height: 48,
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    padding: [ theme.grid.stepSize * 2, theme.grid.stepSize ],
    'border-bottom': '1px solid #eee'
  },

  HeaderSpacer: {
    'flex-grow': 1
  },

  Messages: {
    'font-family': theme.font.family.code,
    overflow: 'auto',
    'flex-grow': 1
  },

  Message: {
    'font-size': theme.font.size.small,
    padding: [ theme.grid.stepSize, theme.grid.stepSize * 2 ],
    'border-bottom': '1px solid #eee',

    '& h3': {
      'font-size': theme.font.size.small
    }
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

  constructor () {
    super();

    this.renderMessage = this.renderMessage.bind(this);
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

  renderMessage (error, index) {
    const { classes } = this.props;

    let content;

    if (!(error instanceof Error)) {
      content = <h3>{error}</h3>;
    } else {
      content = <React.Fragment><h3>Error: {error.message}</h3><p>{error.stack}</p></React.Fragment>;

      if (error.name === 'CommandRejected') {
        content = <h3>Command got rejected: {error.message}</h3>;
      }
    }

    return (
      <div key={ index } className={ classes.Message }>
        { content }
      </div>
    );
  }

  render () {
    const { classes } = this.props;
    const { isExpanded } = this.state;

    if (!state.debugging.messages) {
      return null;
    }

    const componentClasses = classNames(classes.ErrorConsole, {
      [classes.IsExpanded]: isExpanded
    });

    return (
      <div className={ componentClasses }>
        <View orientation='horizontal' adjust='auto' className={ classes.Header }>

          <Button className={ classes.Link } onClick={ this.handleExpandClicked }>Logs and Errors: ({state.debugging.messages.length})</Button>

          <Button className={ classes.Link } onClick={ ErrorConsole.handleClearClicked }>Clear</Button>
          <div className={ classes.HeaderSpacer } />
          { this.state.isExpanded ? <Button className={ classes.Link } onClick={ this.handleCloseClicked }>Close</Button> : null }
        </View>
        <div className={ classes.Messages }>
          { state.debugging.messages.length === 0 ? <div className={ classes.Hint }>No errors encountered yet. Well done!</div> : '' }

          {
            /* eslint-disable no-extra-parens */
            state.debugging.messages.map(this.renderMessage)
            /* eslint-enable no-extra-parens */
          }
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(ErrorConsole));
