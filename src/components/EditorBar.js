import classNames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';

const styles = theme => ({
  EditorBar: {
    display: 'flex',
    'flex-grow': 0,
    'flex-shrink': 0,
    'border-bottom': '1px solid #eee',
    overflow: 'hidden',
    padding: theme.grid.stepSize,
    'align-items': 'center'
  },

  TypeBottom: {
    'border-bottom': 0,
    'border-top': '1px solid #eee'
  }
});

const EditorBar = React.memo(({ children, classes, className, style, type }) => {
  const componentClasses = classNames(classes.EditorBar, {
    [classes.TypeBottom]: type === 'bottom'
  }, className);

  return (
    <div className={ componentClasses } style={ style }>
      { children }
    </div>
  );
});

export default injectSheet(styles)(EditorBar);
