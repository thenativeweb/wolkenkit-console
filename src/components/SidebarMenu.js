import Icon from './Icon';
import React from 'react';
import './SidebarMenu.css';

const Item = function ({ children, onClick }) {
  if (onClick) {
    return (
      <a className='wk-sidebar-menu__sub-item wk-sidebar-menu__sub-item--button' onClick={ onClick }>
        { children }
      </a>
    );
  }

  return (
    <div className='wk-sidebar-menu__sub-item'>
      { children }
    </div>
  );
};

class SidebarMenu extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClicked = this.handleClicked.bind(this);

    this.state = {
      isMouseOver: false
    };
  }

  handleMouseOver () {
    this.setState({
      isMouseOver: true
    });
  }

  handleMouseLeave () {
    this.setState({
      isMouseOver: false
    });
  }

  handleClicked () {
    if (typeof this.props.onDisconnect === 'function') {
      this.props.onDisconnect();
    }
  }

  render () {
    const { isMouseOver } = this.state;
    const { children, icon } = this.props;

    if (isMouseOver) {
      return (
        <div className={ `wk-sidebar-menu` } onClick={ this.handleClicked } onMouseOver={ this.handleMouseOver } onMouseLeave={ this.handleMouseLeave }>
          <div className={ 'wk-sidebar-menu__button' }>
            <Icon name={ icon } />
          </div>
          <div className={ 'wk-sidebar-menu__sub-items' }>
            { children }
          </div>
        </div>
      );
    }

    return (
      <div className={ `wk-sidebar-menu` } onMouseOver={ this.handleMouseOver } onMouseLeave={ this.handleMouseLeave }>
        <div className={ 'wk-sidebar-menu__button' }>
          <Icon name={ icon } />
        </div>
      </div>
    );
  }
}

SidebarMenu.Item = Item;

export default SidebarMenu;
