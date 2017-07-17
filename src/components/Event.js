import { observer } from 'mobx-react';
import React from 'react';
import './Event.css';

const Event = function ({ event }) {
    /* eslint-disable no-extra-parens */
  return (
    <div className='wk-event'>
      <h3>{event.context.name}.{event.aggregate.name}.{event.name}</h3> <br />
      data: {JSON.stringify(event.data)} <br />
      aggregate.id: {event.aggregate.id} <br />
      timestamp: { event.metadata.timestamp }<br />
      revision: { event.metadata.revision }<br />
      correlationId: { event.metadata.correlationId }
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default observer(Event);
