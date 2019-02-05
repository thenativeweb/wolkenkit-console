import AutoSizer from 'react-virtualized-auto-sizer';
import Event from './Event';
import injectSheet from 'react-jss';
import { FixedSizeList as List } from 'react-window';
import ListItem from './ListItem';
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

    this.setListRef = element => {
      this.listRef = element;

      this.updateScrollPosition();
    };

    this.state = {
      selectedEvent: undefined,
      previousEventCount: undefined,
      scrollToIndex: state.watching.collectedEvents.length - 1
    };
  }

  componentDidUpdate () {
    const { previousEventCount } = this.state;
    const newEventCount = state.watching.collectedEvents.length;

    if (previousEventCount !== newEventCount) {
      this.setState({
        previousEventCount: newEventCount,
        scrollToIndex: newEventCount - 1
      }, () => {
        this.updateScrollPosition();
      });
    }
  }

  updateScrollPosition () {
    if (this.listRef) {
      this.listRef.scrollToItem(this.state.scrollToIndex);
    }
  }

  handleEventExpand (selectedEvent) {
    this.setState({
      selectedEvent
    });
  }

  render () {
    const { classes } = this.props;
    const { selectedEvent = {}} = this.state;

    return (
      <div className={ classes.EventConsole }>
        { state.watching.collectedEvents.length === 0 ? <div className={ classes.Hint }>No events have been observed yet. Go ahead and send a command…</div> : '' }

        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={ this.setListRef }
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
                  <ListItem key={ event.id } style={ style }>
                    <Event
                      event={ event }
                      isActive={ event.id === selectedEvent.id }
                      onExpand={ this.handleEventExpand }
                    />
                  </ListItem>
                );
              } }
            </List>
          )}
        </AutoSizer>

        <Modal
          header='Event Details'
          className={ classes.JsonViewer }
          isVisible={ selectedEvent.id !== undefined }
          onCancel={ () => this.setState({ selectedEvent: undefined }) }
          attach='right'
        >
          <PrettyJson value={ selectedEvent } useWorker={ true } />
        </Modal>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(EventConsole));
