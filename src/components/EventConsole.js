import Event from './Event';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';

const styles = theme => ({
  EventConsole: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    background: theme.color.brand.dark,
    'font-family': theme.font.family.code,
    'font-size': theme.font.size.small,
    color: theme.color.brand.light
  },

  Hint: {
    opacity: 0.5,
    padding: theme.grid.stepSize * 2
  }
});

class EventConsole extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      prevEventCount: undefined
    };

    this.scrollContainerRef = React.createRef();
  }

  componentDidUpdate () {
    if (this.state.prevEventCount !== state.watching.collectedEvents.length) {
      const domElement = this.scrollContainerRef.current;

      if (domElement) {
        domElement.scrollTop = domElement.scrollHeight;
      }

      this.setState({
        prevEventCount: state.watching.collectedEvents.length
      });
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={ classes.EventConsole } ref={ this.scrollContainerRef }>
        { state.watching.collectedEvents.length === 0 ? <div className={ classes.Hint }>No events have been observed yet. Go ahead and send a command…</div> : '' }

        {
          state.watching.collectedEvents.map(event => <Event key={ event.id } event={ event } />)
        }
      </div>
    );
  }
}

export default injectSheet(styles)(observer(EventConsole));
