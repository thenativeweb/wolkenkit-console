import Event from './Event';
import injectSheet from 'react-jss';
import { Modal } from 'thenativeweb-ux';
import { observer } from 'mobx-react';
import PrettyJson from './PrettyJson';
import React from 'react';
import state from '../state';
import { toJS } from 'mobx';
import { AutoSizer, List } from 'react-virtualized';

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

    this.scrollContainerRef = React.createRef();
    this.listRef = React.createRef();

    this.handleEventExpand = this.handleEventExpand.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);

    this.state = {
      selectedEvent: undefined,
      prevEventCount: undefined,
      scrollToIndex: state.watching.collectedEvents.length - 1
    };
  }

  componentDidUpdate () {
    const { prevEventCount } = this.state;
    const newEventCount = state.watching.collectedEvents.length;

    if (prevEventCount !== newEventCount) {
      this.setState({
        prevEventCount: newEventCount,
        scrollToIndex: newEventCount - 1
      }, () => {
        if (this.listRef.current) {
          this.listRef.current.scrollToRow(newEventCount - 1);
        }
      });
    }
  }

  handleEventExpand (selectedEvent) {
    this.setState({
      selectedEvent
    });
  }

  rowRenderer ({ index, style }) {
    const event = state.watching.collectedEvents[index];

    return (
      <Event
        key={ event.id }
        event={ event }
        style={ style }
        onExpand={ this.handleEventExpand }
      />
    );
  }

  render () {
    const { classes, scrollToIndex } = this.props;
    const { selectedEvent } = this.state;

    // This use of mobx is needed in order to trigger the observer
    // https://github.com/mobxjs/mobx-react/issues/484
    const items = toJS(state.watching.collectedEvents);

    return (
      <div className={ classes.EventConsole } ref={ this.scrollContainerRef }>
        { state.watching.collectedEvents.length === 0 ? <div className={ classes.Hint }>No events have been observed yet. Go ahead and send a command…</div> : '' }

        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={ this.listRef }
              width={ width }
              height={ height }
              rowCount={ items.length }
              rowHeight={ 200 }
              rowRenderer={ this.rowRenderer }
              scrollToIndex={ scrollToIndex }
            />
          )}
        </AutoSizer>

        <Modal
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
