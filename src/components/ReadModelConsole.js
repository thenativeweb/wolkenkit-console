import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import PrettyJson from './PrettyJson';
import React from 'react';
import ReadModelItem from './ReadModelItem';
import state from '../state';
import watching from '../actions/watching';
import { Dropdown, Modal } from 'thenativeweb-ux';

const styles = theme => ({
  ReadModelConsole: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    'flex-direction': 'column'
  },

  Bar: {
    'flex-grow': 0,
    display: 'flex',
    padding: theme.grid.stepSize * 2,
    'border-bottom': '1px solid #444',
    'align-items': 'center'
  },

  Items: {
    'flex-grow': 1,
    height: '100%',
    width: '100%',
    overflow: 'auto',
    background: theme.color.brand.dark,
    'font-family': theme.font.family.code,
    'font-size': theme.font.size.small,
    color: '#eee'
  },

  JsonViewer: {
    minWidth: '45vw'
  }
});

class ReadModelConsole extends React.Component {
  static handleModelChanged (newModel) {
    watching.startReadingModel(newModel);
  }

  constructor () {
    super();

    this.saveContainerRef = this.saveContainerRef.bind(this);
    this.handleJsonClick = this.handleJsonClick.bind(this);

    this.state = {
      json: undefined
    };
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

    const listNames = Object.keys(state.backend.configuration.readModel.lists);

    watching.startReadingModel(listNames[0]);
  }

  componentWillUnmount () {
    watching.stopReadingModel();
    this.mutationObserver.disconnect();
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  handleJsonClick (value) {
    this.setState({
      json: value
    });
  }

  render () {
    if (!state.backend.configuration || !state.watching.selectedReadModel) {
      return null;
    }

    const { classes } = this.props;
    const { json } = this.state;

    return (
      <div className={ classes.ReadModelConsole }>
        <div className={ classes.Bar }>
          <Dropdown
            size='s'
            options={ Object.keys(state.backend.configuration.readModel.lists).map(list => ({ label: list, value: list })) }
            value={ state.watching.selectedReadModel }
            onChange={ ReadModelConsole.handleModelChanged }
          />
        </div>
        <div className={ classes.Items } ref={ this.saveContainerRef }>
          {
            state.watching.selectedReadModelItems.map(item => <ReadModelItem key={ item.id } item={ item } onJsonClick={ this.handleJsonClick } />)
          }
        </div>
        <Modal className={ classes.JsonViewer } isVisible={ json !== undefined } onCancel={ () => this.setState({ json: undefined }) }>
          <PrettyJson value={ json } />
        </Modal>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(ReadModelConsole));
