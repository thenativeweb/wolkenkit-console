import { Button } from 'thenativeweb-ux';
import CodeMirror from 'codemirror';
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

const styles = theme => ({
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
});

class Editor extends React.Component {
  constructor () {
    super();

    this.handleEditorChanged = this.handleEditorChanged.bind(this);
  }

  componentDidMount () {
    const { configuration, onExecute } = this.props;

    const contexts = [];
    const aggregates = {};

    Object.keys(configuration.writeModel).forEach(contextName => {
      contexts.push({ text: contextName });
      aggregates[contextName] = [];

      Object.keys(configuration.writeModel[contextName]).forEach(aggregateName => {
        aggregates[contextName].push({ text: aggregateName });
      });
    });

    // CodeMirror.registerHelper('hint', 'wolkenkit', (editor, options) => {
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
        'Ctrl-Enter' () {
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

  componentDidUpdate (prevProps) {
    this.ignoreChangeEvent = true;

    if (this.props.value !== prevProps.value &&
        this.props.value !== this.cachedValue) {
      this.cachedValue = this.props.value;
      this.editor.setValue(this.props.value);
    }
    this.ignoreChangeEvent = false;
  }

  handleEditorChanged () {
    const { editor, ignoreChangeEvent } = this;
    const { onChange } = this.props;

    if (!ignoreChangeEvent) {
      this.cachedValue = editor.getValue();

      if (onChange) {
        onChange(this.cachedValue);
      }
    }
  }

  render () {
    const { classes, configuration, onInsertCommandClick } = this.props;

    return (
      <div className={ classes.Editor }>
        <EditorBar onInsertCommandClick={ onInsertCommandClick } configuration={ configuration } />
        <div
          className={ classes.EditorContainer }
          ref={ ref => {
            this.container = ref;
          } }
        />
        <div className='wk-editor-bar wk-editor-bar--bottom'>
          <Button onClick={ this.props.onExecute }>
            Execute <Button.Hint>[Ctrl+Enter]</Button.Hint>
          </Button>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Editor);
