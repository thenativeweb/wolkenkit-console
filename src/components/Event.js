import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import React from 'react';
import { toJS } from 'mobx';
import yaml from 'js-yaml';

const styles = theme => ({
  Event: {
    padding: theme.grid.stepSize * 2,
    'border-bottom': '1px solid #444',
    color: '#666',
    'white-space': 'pre',
    'line-height': 1.2
  },

  Title: {
    'font-size': theme.font.size.small,
    'margin-bottom': theme.grid.stepSize / 2,
    color: theme.color.brand.white,
    margin: 0,
    padding: 0
  },

  Details: {}
});

const Event = function ({ classes, event }) {
  if (!event) {
    return null;
  }

  const full = [ 'context', 'aggregate.name', 'name', 'type', 'custom', 'metadata.published', 'metadata.position' ];
  const compact = [ ...full, 'id', 'metadata' ];

  /* eslint-disable no-extra-parens */
  const eventDetails = yaml.safeDump(omit(toJS(event), compact));

  return (
    <div className={ classes.Event }>
      <h3 className={ classes.Title }>{event.context.name}.{event.aggregate.name}.{event.name}</h3>
      <div className={ classes.Details } dangerouslySetInnerHTML={{ __html: eventDetails }} />
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default injectSheet(styles)(observer(Event));
