import Icon from './Icon';
import React, { PureComponent } from 'react';
import './ConnectionButton.css';

class ConnectionButton extends PureComponent {
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
    if (this.state.isMouseOver) {
      return (
        <div className={ `wk-connection-button` } onClick={ this.handleClicked } onMouseOver={ this.handleMouseOver } onMouseLeave={ this.handleMouseLeave }>
          <Icon name='disconnect-connection' />
        </div>
      );
    }

    return (
      <div className={ `wk-connection-button` } onMouseOver={ this.handleMouseOver } onMouseLeave={ this.handleMouseLeave }>
        <Icon name='opened-connection' />
      </div>
    );
  }
}

export default ConnectionButton;
