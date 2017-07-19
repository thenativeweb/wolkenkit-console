import debugging from '../readModel/debugging';
import Event from './Event';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import './EventConsole.css';

class EventConsole extends Component {
  constructor () {
    super();

    this.saveContainerRef = this.saveContainerRef.bind(this);
    this.handleDOMContentChanged = this.handleDOMContentChanged.bind(this);
  }

  componentDidMount () {
    this.mutationObserver = new MutationObserver(this.handleDOMContentChanged);

    this.mutationObserver.observe(this.container, {
      childList: true
    });

    this.handleDOMContentChanged();
  }

  componentWillUnmount () {
    this.mutationObserver.disconnect();
  }

  handleDOMContentChanged () {
    if (this.container || document.contains(this.container)) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  render () {
    return (
      <div className='wk-event-console' ref={ this.saveContainerRef }>
        { debugging.collectedEvents.length === 0 ? <div className='wk-hint'>No events have been observed yet. Go ahead and send a command…</div> : '' }

        {
          debugging.collectedEvents.map(event => <Event key={ event.id } event={ event } />)
        }
      </div>
    );
  }
}

export default observer(EventConsole);
