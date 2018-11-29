import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import { Button } from 'thenativeweb-ux';
import CodeMirror from 'codemirror';
import CommandBuilder from './CommandBuilder';
import EditorBar from './EditorBar';
import injectSheet from 'react-jss';
import React from 'react';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/addon/hint/show-hint.css';
import '../../node_modules/codemirror/theme/neo.css';

var styles = function styles(theme) {
  return {
    Editor: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
      overflow: 'hidden'
    },
    EditorContainer: {
      display: 'flex',
      'flex-grow': 1,
      'flex-shrink': 1,
      position: 'relative',
      overflow: 'hidden',
      '& .CodeMirror': {
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        'font-family': theme.font.family.code,
        'font-size': theme.font.size.small
      },
      '& .CodeMirror .CodeMirror-cursor ': {
        'border-left': '1px solid #819090 !important',
        width: '0 !important'
      }
    }
  };
};

var Editor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor() {
    var _this;

    _classCallCheck(this, Editor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Editor).call(this));
    _this.handleEditorChanged = _this.handleEditorChanged.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Editor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          configuration = _this$props.configuration,
          onExecute = _this$props.onExecute;
      var contexts = [];
      var aggregates = {};
      Object.keys(configuration.writeModel).forEach(function (contextName) {
        contexts.push({
          text: contextName
        });
        aggregates[contextName] = [];
        Object.keys(configuration.writeModel[contextName]).forEach(function (aggregateName) {
          aggregates[contextName].push({
            text: aggregateName
          });
        });
      }); // CodeMirror.registerHelper('hint', 'wolkenkit', (editor, options) => {
      //   const cursor = editor.getCursor();
      //   const token = editor.getTokenAt(cursor);
      //
      //   console.log(token);
      //
      //   const tokenStart = token.type !== null && /"|\w/.test(token.string[0])
      //     ? token.start
      //     : token.end;
      //
      //   const results = {
      //     list: [],
      //     from: {line: cursor.line, column: tokenStart},
      //     to: {line: cursor.line, column: token.end},
      //   };
      //
      //   if (!token.type && token.string === '') {
      //     results.list = [
      //       { text: 'app' }
      //     ];
      //   } else if (!token.type && token.string !== '.') {
      //     results.list = contexts;
      //   } else if (token.type === 'variable' && token.string === 'app') {
      //     results.list = contexts.map(item => { return { text: '.' + item.text }});
      //   } else if (token.type === 'property' && contexts.some(item => item.text === token.string )) {
      //     results.list = aggregates[token.string].map(item => { return { text: '.' + item.text }});
      //   }
      //
      //
      //   return results;
      // });
      // CodeMirror.commands.autocomplete = function(editor) {
      //   editor.showHint({ hint: CodeMirror.hint.wolkenkit });
      // };

      this.editor = new CodeMirror(this.container, {
        autoCloseBrackets: true,
        autofocus: true,
        extraKeys: {
          'Ctrl-Enter': function CtrlEnter() {
            onExecute();
          },
          'Ctrl-Space': 'autocomplete'
        },
        lineNumbers: true,
        matchBrackets: true,
        mode: 'javascript',
        showCursorWhenSelecting: true,
        styleActiveLine: true,
        tabSize: 2,
        theme: 'neo',
        value: this.props.value
      });
      this.editor.on('change', this.handleEditorChanged);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.ignoreChangeEvent = true;

      if (this.props.value !== prevProps.value && this.props.value !== this.cachedValue) {
        this.cachedValue = this.props.value;
        this.editor.setValue(this.props.value);
      }

      this.ignoreChangeEvent = false;
    }
  }, {
    key: "handleEditorChanged",
    value: function handleEditorChanged() {
      var editor = this.editor,
          ignoreChangeEvent = this.ignoreChangeEvent;
      var onChange = this.props.onChange;

      if (!ignoreChangeEvent) {
        this.cachedValue = editor.getValue();

        if (onChange) {
          onChange(this.cachedValue);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          classes = _this$props2.classes,
          configuration = _this$props2.configuration,
          onInsertCommandClick = _this$props2.onInsertCommandClick;
      return React.createElement("div", {
        className: classes.Editor
      }, React.createElement(EditorBar, null, React.createElement(CommandBuilder, {
        onInsertCommandClick: onInsertCommandClick,
        configuration: configuration
      })), React.createElement("div", {
        className: classes.EditorContainer,
        ref: function ref(_ref) {
          _this2.container = _ref;
        }
      }), React.createElement(EditorBar, {
        type: "bottom",
        style: {
          alignItems: 'flex-end'
        }
      }, React.createElement(Button, {
        size: "s",
        isPrimary: true,
        onClick: this.props.onExecute
      }, "Execute ", React.createElement(Button.Hint, null, "[Ctrl+Enter]"))));
    }
  }]);

  return Editor;
}(React.Component);

export default injectSheet(styles)(Editor);