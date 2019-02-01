import injectSheet from 'react-jss';
import JSONTree from 'react-json-tree';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import React from 'react';

const styles = theme => ({
  Event: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.grid.stepSize * 2,
    'border-bottom': '1px solid #444',
    color: '#666',
    'white-space': 'pre',
    'line-height': 1.2,
    boxSizing: 'border-box',
    overflow: 'hidden'
  }
});

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#2f333b',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#ffffffcc',
  base0C: '#a1efe4',
  base0D: '#666',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};

const EventTree = React.memo(({ event }) => {
  if (!event) {
    return null;
  }

  const simplifiedEvent = omit(event, [
    'context',
    'aggregate.name',
    'name',
    'type',
    'custom',
    'metadata.published',
    'metadata.position',
    'id',
    'metadata'
  ]);

  return (
    <JSONTree
      shouldExpandNode={ (keyName, data, level) => {
        if (Array.isArray(data)) {
          return false;
        }

        if (level > 3) {
          return false;
        }

        return true;
      } }
      theme={ theme }
      getItemString={ (type, data, itemType) => <span>{itemType}</span> }
      data={ simplifiedEvent }
      invertTheme={ false }
    />
  );
});

export default injectSheet(styles)(observer(EventTree));
