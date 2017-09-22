import anime from 'animejs';
import React from 'react';
import './ModalContent.css';

const Row = function ({ children }) {
  return (
    <div className='wk-modal-content__row'>{ children }</div>
  );
};

class ModalContent extends React.PureComponent {
  componentDidMount (done) {
    anime({
      targets: this.element,
      opacity: [ 0, 1 ],
      translateX: [ '-25%', 0 ],
      duration: ModalContent.transitionDuration,
      easing: 'easeOutExpo',
      complete: done
    });
  }

  componentWillEnter (done) {
    anime({
      targets: this.element,
      opacity: [ 0, 1 ],
      translateX: [ '-25%', 0 ],
      duration: ModalContent.transitionDuration,
      easing: 'easeOutExpo',
      complete: done
    });
  }

  componentWillLeave (done) {
    anime({
      targets: this.element,
      opacity: [ 1, 0 ],
      translateX: [ 0, '-25%' ],
      duration: ModalContent.transitionDuration,
      easing: 'easeOutExpo',
      complete: done
    });
  }

  render () {
    /* eslint-disable no-return-assign */
    return (
      <div ref={ ref => this.element = ref } className='wk-modal-content'>
        { this.props.children }
      </div>
    );
    /* eslint-enable no-return-assign */
  }
}

ModalContent.Row = Row;

ModalContent.transitionDuration = 300;

export default ModalContent;
