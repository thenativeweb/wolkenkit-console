import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import React from 'react';
import { toJS } from 'mobx';
import yaml from 'js-yaml';
import './Event.css';

const Event = function ({ event }) {
  const full = [ 'context', 'aggregate.name', 'name', 'type', 'custom', 'metadata.published', 'metadata.position' ];
  const compact = [ ...full, 'id', 'metadata' ];

  /* eslint-disable no-extra-parens */
  const eventDetails = yaml.safeDump(omit(toJS(event), compact));

  return (
    <div className='wk-event'>
      <h3>{event.context.name}.{event.aggregate.name}.{event.name}</h3>
      <div className='wk-event__details' dangerouslySetInnerHTML={{ __html: eventDetails }} />
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default observer(Event);
