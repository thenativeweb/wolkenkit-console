import CopyPasteValue from './CopyPasteValue';
import injectSheet from 'react-jss';
import JSONTree from 'react-json-tree';
import React from 'react';

const styles = theme => ({
  JSONViewer: {
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
  scheme: 'wolkenkit',
  author: 'the native web',
  base00: 'transparent',
  base01: '#383830',
  base02: '#49483e',
  base03: '#666',
  base04: '#666',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#666',
  base09: '#666',
  base0A: '#666',
  base0B: '#666',
  base0C: '#666',
  base0D: '#666',
  base0E: '#666',
  base0F: '#666'
};

const Tree = React.memo(({ classes, value }) => (
  <JSONTree
    shouldExpandNode={ (keyName, data, level) => {
      if (level > 2) {
        return false;
      }

      return true;
    } }
    hideRoot={ true }
    theme={{
      extend: theme,
      tree: {
        border: 0,
        padding: 0,
        marginTop: '0',
        marginBottom: '0',
        marginLeft: '0',
        marginRight: 0,
        listStyle: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none'
      },
      value: ({ style }, nodeType, keyPath) => ({
        style: {
          ...style,
          paddingTop: '0.25em',
          paddingRight: 0,
          marginLeft: '0.875em',
          WebkitUserSelect: 'text',
          MozUserSelect: 'text',
          wordWrap: 'break-word',
          paddingLeft: keyPath.length > 1 ? '2.125em' : '1.25em',
          textIndent: '-0.5em',
          wordBreak: 'break-all',
          whiteSpace: 'nowrap'
        }
      }),
      arrow: ({ style }, nodeType, expanded) => ({
        style: {
          ...style,
          marginLeft: 0,
          transition: '150ms',
          WebkitTransition: '150ms',
          MozTransition: '150ms',
          WebkitTransform: expanded ? 'rotateZ(135deg)' : 'rotateZ(45deg)',
          MozTransform: expanded ? 'rotateZ(135deg)' : 'rotateZ(45deg)',
          transform: expanded ? 'rotateZ(135deg)' : 'rotateZ(45deg)',
          transformOrigin: '50% 50%',
          WebkitTransformOrigin: '50% 50%',
          MozTransformOrigin: '50% 50%',
          position: 'relative',
          top: 4,
          width: 4,
          height: 4,
          borderTop: '2px solid #666',
          borderRight: '2px solid #666',
          lineHeight: '1.1em'
        }
      }),
      arrowSign: {
        color: 'transparent'
      }
    }}
    valueRenderer={ raw => <CopyPasteValue value={ raw } /> }
    getItemString={ (type, data, itemType) => itemType }
    data={ value }
    invertTheme={ false }
    className={ classes.Tree }
  />
));

export default injectSheet(styles)(Tree);
