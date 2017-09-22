import React from 'react';
import './TextBox.css';

class TextBox extends React.Component {
  constructor (props) {
    super(props);

    this.handleFocusTimeout = this.handleFocusTimeout.bind(this);
    this.handleRefChanged = this.handleRefChanged.bind(this);
  }

  componentDidMount () {
    const { autoFocus, focusDelay } = this.props;

    if (!autoFocus) {
      return;
    }

    if (this.element) {
      this.focusTimeout = setTimeout(this.handleFocusTimeout, focusDelay);
    } else {
      clearTimeout(this.focusTimeout);
    }
  }

  componentWillUnmount () {
    clearTimeout(this.focusTimeout);
  }

  handleFocusTimeout () {
    if (this.element) {
      this.element.focus();
    }
  }

  handleRefChanged (ref) {
    this.element = ref;
  }

  render () {
    const { className, id, name, value, onChange, placeholder, required, size, type } = this.props;
    let componentClasses = `wk-text-box`;

    if (className) {
      componentClasses += ` ${className}`;
    }

    if (type) {
      componentClasses += ` wk-text-box--type-${type}`;
    }

    if (size) {
      componentClasses += ` wk-text-box--size-${size}`;
    }

    return (
      <input
        id={ id }
        ref={ this.handleRefChanged }
        className={ componentClasses }
        name={ name }
        value={ value }
        onChange={ onChange }
        placeholder={ placeholder }
        required={ required }
      />
    );
  }
}

TextBox.defaultProps = {
  focusDelay: 0
};

export default TextBox;
