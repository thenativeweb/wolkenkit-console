import { observer } from 'mobx-react';
import ReadModelItem from './ReadModelItem';
import state from '../state';
import watching from '../actions/watching';
import React from 'react';
// import './ReadModelsConsole.css';

class ReadModels extends React.Component {
  static handleModelChanged (event) {
    watching.startReadingModel(event.target.value);
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

    if (state.watching.selectedReadModel !== 'none') {
      watching.startReadingModel(state.watching.selectedReadModel);
    }
  }

  componentWillUnmount () {
    watching.stopReadingModel();
    this.mutationObserver.disconnect();
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  render () {
    if (!state.backend.configuration || !state.watching.selectedReadModel) {
      return null;
    }

    return (
      <div className='wk-read-model-console'>
        <div className='wk-read-model__bar'>
          <div className='wk-dropdown'>
            <select value={ state.watching.selectedReadModel } onChange={ ReadModels.handleModelChanged }>
              <option key={ 'none' } value='none'>Choose model…</option>
              {
                Object.keys(state.backend.configuration.readModel.lists).map(listName =>
                  <option key={ listName } value={ listName }>{listName}</option>
                )
              }
            </select>
          </div>
        </div>
        <div className='wk-read-model__items' ref={ this.saveContainerRef }>
          {
            state.watching.selectedReadModelItems.map(item => <ReadModelItem key={ item.id } item={ item } />)
          }
        </div>
      </div>
    );
  }
}

export default observer(ReadModels);
