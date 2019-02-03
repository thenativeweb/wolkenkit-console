import injectSheet from 'react-jss';
import React from 'react';

const styles = theme => ({
  ListItem: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    'border-bottom': `1px solid ${theme.color.brand.midGrey}`,
    transition: 'background 200ms ease-in-out',
    willChange: 'background',

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.1)'
    }
  }
});

const ListItem = React.memo(({ classes, children, style }) => (
  <div className={ classes.ListItem } style={ style }>
    { children }
  </div>
));

export default injectSheet(styles)(ListItem);
