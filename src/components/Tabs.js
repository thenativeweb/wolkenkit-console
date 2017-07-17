import React, { PureComponent } from 'react';
import './Tabs.css';

class Tabs extends PureComponent {
  constructor (props) {
    super(props);

    this.handleTabClicked = this.handleTabClicked.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  handleTabClicked (event) {
    this.setState({
      activeIndex: Number(event.target.getAttribute('data-index'))
    });
  }

  renderTabs () {
    if (!this.props.children) {
      throw new Error('Tabs should contain at least one child.');
    }

    if (!Array.isArray(this.props.children)) {
      this.props.children = [ this.props.children ];
    }

    return (
      this.props.children.map((child, index) =>
        /* eslint-disable no-extra-parens */
        (
          <div
            key={ index }
            className={ `wk-tab ${this.state.activeIndex === index ? 'active' : ''}` }
            data-index={ index }
            onClick={ this.handleTabClicked }
          >
            {child.props.title}
          </div>
        )
        /* eslint-enable no-extra-parens */
      )
    );
  }

  renderActiveTab () {
    return this.props.children[this.state.activeIndex];
  }

  render () {
    return (
      <div className={ `wk-tabs wk-tabs--orientation-${this.props.orientation}` }>
        <div className='wk-tabs__navigation'>
          {this.renderTabs()}
        </div>
        <div className='wk-tabs__content'>
          {this.renderActiveTab()}
        </div>
      </div>
    );
  }
}

export default Tabs;
