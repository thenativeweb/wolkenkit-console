import Event from './Event';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';
import { toJS } from 'mobx';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

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

    this.cellMeasureCache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 50
    });

    this.rowRenderer = this.rowRenderer.bind(this);

    this.scrollContainerRef = React.createRef();
    this.listRef = React.createRef();

    this.state = {
      prevEventCount: undefined,
      scrollToIndex: undefined
    };
  }

  componentDidMount () {
    this.setState({
      scrollToIndex: state.watching.collectedEvents.length - 1
    });
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

  rowRenderer ({ index, style, parent }) {
    const event = state.watching.collectedEvents[index];

    return (
      <CellMeasurer
        cache={ this.cellMeasureCache }
        columnIndex={ 0 }
        key={ event.id }
        rowIndex={ index }
        parent={ parent }
      >
        <Event key={ event.id } event={ event } style={ style } />
      </CellMeasurer>
    );
  }

  render () {
    const { classes, scrollToIndex } = this.props;

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
              rowHeight={ this.cellMeasureCache.rowHeight }
              rowRenderer={ this.rowRenderer }
              scrollToIndex={ scrollToIndex }
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(EventConsole));
