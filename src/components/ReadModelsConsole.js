import debugging from '../readModel/debugging';
import { observer } from 'mobx-react';
import ReadModelItem from './ReadModelItem';
import React, { Component } from 'react';
import { resetReadModel, startReadingModel, stopReadingModel } from '../writeModel/backend';
import './ReadModelsConsole.css';

class ReadModels extends Component {
  static handleModelChanged (event) {
    startReadingModel(event.target.value);
  }

  constructor () {
    super();

    this.saveContainerRef = this.saveContainerRef.bind(this);
  }

  componentDidMount () {
    this.mutationObserver = new MutationObserver(() => {
      if (this.container && document.contains(this.container)) {
        this.container.scrollTop = this.container.scrollHeight;
      }
    });

    this.mutationObserver.observe(this.container, {
      childList: true
    });
  }

  componentWillUnmount () {
    stopReadingModel();
    resetReadModel();
    this.mutationObserver.disconnect();
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  render () {
    const { configuration } = this.props;

    if (!configuration) {
      return null;
    }

    return (
      <div className='wk-read-model-console'>
        <div className='wk-read-model__bar'>
          <div className='wk-dropdown'>
            <select value={ debugging.selectedReadModel } onChange={ ReadModels.handleModelChanged }>
              <option key={ 'none' } value='none'>Choose model…</option>
              {
                Object.keys(configuration.readModel.lists).map(listName =>
                  <option key={ listName } value={ listName }>{listName}</option>
                )
              }
            </select>
          </div>
        </div>
        <div className='wk-read-model__items' ref={ this.saveContainerRef }>
          {
            debugging.selectedReadModelItems.map(item => <ReadModelItem key={ item.id } item={ item } />)
          }
        </div>
      </div>
    );
  }
}

ReadModels.defaultProps = {
  selectedModel: 'none'
};

export default observer(ReadModels);
