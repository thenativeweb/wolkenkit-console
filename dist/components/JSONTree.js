import _objectSpread from "@babel/runtime/helpers/objectSpread";
import CopyPasteValue from './CopyPasteValue';
import injectSheet from 'react-jss';
import JSONTree from 'react-json-tree';
import React from 'react';

var styles = function styles(theme) {
  return {
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
  };
};

var theme = {
  scheme: 'wolkenkit',
  author: 'the native web',
  base00: 'transparent',
  base01: '#383830',
  base02: '#49483e',
  // ITEM_STRING_EXPANDED_COLOR
  base03: '#66666677',
  base04: '#666',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#666',
  base09: '#666',
  base0A: '#666',
  // STRING_COLOR
  // DATE_COLOR
  base0B: '#666',
  base0C: '#666',
  base0D: '#666',
  base0E: '#666',
  base0F: '#666'
};
var Tree = React.memo(function (_ref) {
  var classes = _ref.classes,
      value = _ref.value;
  return React.createElement(JSONTree, {
    shouldExpandNode: function shouldExpandNode(keyName, data, level) {
      if (level > 2) {
        return false;
      }

      return true;
    },
    hideRoot: true,
    theme: {
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
      value: function value(_ref2, nodeType, keyPath) {
        var style = _ref2.style;
        return {
          style: _objectSpread({}, style, {
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
          })
        };
      },
      arrow: function arrow(_ref3, nodeType, expanded) {
        var style = _ref3.style;
        return {
          style: _objectSpread({}, style, {
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
          })
        };
      },
      arrowContainer: function arrowContainer(_ref4) {
        var style = _ref4.style;
        return {
          style: _objectSpread({}, style, {
            width: 6,
            height: 14
          })
        };
      },
      arrowSign: {
        color: 'transparent'
      }
    },
    valueRenderer: function valueRenderer(raw) {
      return React.createElement(CopyPasteValue, {
        value: raw,
        stringify: false
      });
    },
    getItemString: function getItemString(type, data, itemType, itemString) {
      switch (type) {
        case 'Array':
          return "[\u2026] (".concat(data.length, ")");

        case 'Object':
          return "{\u2026} (".concat(Reflect.ownKeys(data).length, ")");

        default:
          return itemString;
      }
    },
    data: value,
    invertTheme: false,
    className: classes.Tree
  });
});
export default injectSheet(styles)(Tree);