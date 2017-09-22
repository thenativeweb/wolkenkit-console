import ModalContent from './ModalContent';
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import './Modal.css';

const ESCAPE_KEY = 27;

const Title = function ({ children, className }) {
  let componentClasses = `wk-modal__title`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  return (
    <h2 className={ componentClasses }>
      { children }
    </h2>
  );
};

class Modal extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleBackDropClicked = this.handleBackDropClicked.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount () {
    this.handleVisibility(this.props.isVisible);
  }

  componentDidUpdate () {
    this.handleVisibility(this.props.isVisible);
  }

  componentWillUnmount () {
    this.handleVisibility(false);
  }

  handleVisibility (isVisible) {
    if (isVisible) {
      window.addEventListener('keydown', this.handleKeyDown);
      document.querySelector('body').classList.add('wk-modal--visible');
    } else {
      window.removeEventListener('keydown', this.handleKeyDown);
      document.querySelector('body').classList.remove('wk-modal--visible');
    }
  }

  handleKeyDown (event) {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        if (this.props.onCancel) {
          this.props.onCancel();
        }
        break;
      default:
        break;
    }
  }

  handleBackDropClicked () {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render () {
    const { children, isVisible } = this.props;

    let content;

    let backdropClasses = 'wk-modal__backdrop';

    if (isVisible) {
      backdropClasses = `${backdropClasses} wk-modal__backdrop--visible`;
    }

    if (!isVisible) {
      content = null;
    } else {
      content = <ModalContent>{ children }</ModalContent>;
    }

    return (
      <div className='wk-modal'>
        <div className={ backdropClasses } onClick={ this.handleBackDropClicked } />
        <ReactTransitionGroup>
          { content }
        </ReactTransitionGroup>
      </div>
    );
  }
}

Modal.Title = Title;
Modal.Row = ModalContent.Row;

Modal.defaultProps = {
  isVisible: false,
  onCancel () {}
};

export default Modal;
