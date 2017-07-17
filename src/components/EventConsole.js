import debugging from '../readModel/debugging';
import Event from './Event';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { startObservingEvents, stopObservingEvents } from '../writeModel/backend';
import './EventConsole.css';

class EventConsole extends Component {
  constructor () {
    super();

    this.saveContainerRef = this.saveContainerRef.bind(this);

    this.state = {
      isConnected: false,
      events: []
    };
  }

  componentDidMount () {
    startObservingEvents();

    this.mutationObserver = new MutationObserver(() => {
      if (this.container && document.contains(this.container)) {
        this.container.scrollTop = this.container.scrollHeight;
      }
    });

    this.mutationObserver.observe(this.container, {
      childList: true
    });
  }

  componentWillUnmount () {
    stopObservingEvents();
    this.mutationObserver.disconnect();
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
