import classNames from 'classnames';
import injectSheet from 'react-jss';
import React, { useState } from 'react';

const styles = theme => ({
  Tabs: {
    display: 'flex',
    'flex-direction': 'column',
    background: theme.color.brand.dark,
    color: theme.color.brand.lightGrey,
    width: '100%',
    height: '100%'
  },

  Navigation: {
    display: 'flex',
    'flex-direction': 'row'
  },

  Tab: {
    'flex-grow': 1,
    'flex-basis': 'auto',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    padding: '20px',
    cursor: 'pointer',
    'border-bottom': '2px solid #444'
  },

  IsActive: {
    'border-bottom': `2px solid ${theme.color.brand.highlight}`,
    color: theme.color.brand.highlight
  },

  ActiveTabContent: {
    'flex-grow': 1,
    'flex-basis': '100%',
    display: 'flex',
    overflow: 'auto'
  }
});

const Tabs = function ({ className, classes, children } = {}) {
  const componentClasses = classNames(classes.Tabs, className);

  if (!children) {
    throw new Error('Tabs should contain at least one child.');
  }
  if (!Array.isArray(children)) {
    children = [ children ];
  }

  const [ activeIndex, setActiveIndex ] = useState(0);

  const handleTabClicked = function (event) {
    const newIndex = Number(event.target.getAttribute('data-index'));

    setActiveIndex(newIndex);
  };

  /* eslint-disable react/jsx-no-bind */
  return (
    <div className={ componentClasses }>
      <div className={ classes.Navigation }>
        {
          /* eslint-disable no-extra-parens */
          children.map((child, index) => (
            <div
              key={ index }
              className={ classNames(classes.Tab, { [classes.IsActive]: activeIndex === index }) }
              data-index={ index }
              onClick={ handleTabClicked }
            >
              { child.props.title }
            </div>
          ))
          /* eslint-enable no-extra-parens */
        }
      </div>
      <div className={ classes.ActiveTabContent }>
        { children[activeIndex] }
      </div>
    </div>
    /* eslint-enable react/jsx-no-bind */
  );
};

export default injectSheet(styles)(Tabs);
