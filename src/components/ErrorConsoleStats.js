import { Button } from 'thenativeweb-ux';
import debugging from '../actions/debugging';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';

const styles = () => ({
  ErrorConsoleStats: {},

  Link: {
    margin: 0
  }
});

class ErrorConsoleStats extends React.Component {
  static handleExpandClicked () {
    debugging.toggleErrorConsole();
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={ classes.ErrorConsoleStats }>
        <Button isSubtle={ true } className={ classes.Link } onClick={ ErrorConsoleStats.handleExpandClicked }>Logs and Errors: {state.debugging.messages.length}</Button>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(ErrorConsoleStats));
