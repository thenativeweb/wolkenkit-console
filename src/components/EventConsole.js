import AutoSizer from 'react-virtualized-auto-sizer';
import Event from './Event';
import injectSheet from 'react-jss';
import { FixedSizeList as List } from 'react-window';
import { Modal } from 'thenativeweb-ux';
import { observer } from 'mobx-react';
import PrettyJson from './PrettyJson';
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
  },

  JsonViewer: {
    minWidth: '30vw'
  }
});

class EventConsole extends React.Component {
  constructor (props) {
    super(props);

    this.handleEventExpand = this.handleEventExpand.bind(this);
    this.listRef = React.createRef();

    this.state = {
      selectedEvent: undefined,
      prevEventCount: undefined,
      scrollToIndex: state.watching.collectedEvents.length - 1
    };
  }

  componentDidMount () {
    this.updateScrollPosition();
  }

  componentDidUpdate () {
    const { prevEventCount } = this.state;
    const newEventCount = state.watching.collectedEvents.length;

    if (prevEventCount !== newEventCount) {
      this.setState({
        prevEventCount: newEventCount,
        scrollToIndex: newEventCount - 1
      }, () => {
        this.updateScrollPosition();
      });
    }
  }

  updateScrollPosition () {
    if (this.listRef.current) {
      this.listRef.current.scrollToItem(this.state.scrollToIndex);
    }
  }

  handleEventExpand (selectedEvent) {
    this.setState({
      selectedEvent
    });
  }

  render () {
    const { classes } = this.props;
    const { selectedEvent } = this.state;

    return (
      <div className={ classes.EventConsole }>
        { state.watching.collectedEvents.length === 0 ? <div className={ classes.Hint }>No events have been observed yet. Go ahead and send a command…</div> : '' }

        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={ this.listRef }
              width={ width }
              height={ height }
              itemCount={ state.watching.collectedEvents.length }
              itemSize={ 200 }
              itemData={ state.watching.collectedEvents }
              itemKey={ (index, data) => data[index].id }
            >
              { ({ index, style }) => {
                const event = state.watching.collectedEvents[index];

                return (
                  <Event
                    key={ event.id }
                    event={ event }
                    style={ style }
                    onExpand={ this.handleEventExpand }
                  />
                );
              } }
            </List>
          )}
        </AutoSizer>

        <Modal
          header='Event Details'
          className={ classes.JsonViewer }
          isVisible={ selectedEvent !== undefined }
          onCancel={ () => this.setState({ selectedEvent: undefined }) }
          attach='right'
        >
          <PrettyJson value={ selectedEvent } />
        </Modal>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(EventConsole));
