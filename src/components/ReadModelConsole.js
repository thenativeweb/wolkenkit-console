import AutoSizer from 'react-virtualized-auto-sizer';
import injectSheet from 'react-jss';
import { FixedSizeList as List } from 'react-window';
import PrettyJson from './PrettyJson';
import React from 'react';
import ReadModelItem from './ReadModelItem';
import state from '../state';
import watching from '../actions/watching';
import { Dropdown, Modal } from 'thenativeweb-ux';
import { observer, Observer } from 'mobx-react';

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
    minWidth: '30vw'
  }
});

class ReadModelConsole extends React.Component {
  static handleModelChanged (newModel) {
    watching.startReadingModel(newModel);
  }

  constructor () {
    super();

    this.handleJsonClick = this.handleJsonClick.bind(this);

    this.state = {
      json: undefined
    };
  }

  /* eslint-disable class-methods-use-this */
  componentDidMount () {
    const listNames = Object.keys(state.backend.configuration.readModel.lists);

    if (listNames[0]) {
      watching.startReadingModel(listNames[0]);
    }
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable class-methods-use-this */
  componentWillUnmount () {
    watching.stopReadingModel();
  }
  /* eslint-enable class-methods-use-this */

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

    // This use of mobx Observer here is needed in order to trigger updates on items
    // https://github.com/mobxjs/mobx-react/issues/484

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
        <div className={ classes.Items }>
          <AutoSizer>
            {({ height, width }) => (
              <Observer>
                { () => (
                  <List
                    width={ width }
                    height={ height }
                    itemCount={ state.watching.selectedReadModelItems.length }
                    itemSize={ 68 }
                    itemData={ state.watching.selectedReadModelItems }
                    itemKey={ (index, data) => data[index].id }
                  >
                    { ({ index, style }) => {
                      const item = state.watching.selectedReadModelItems[index];

                      return (
                        <ReadModelItem
                          key={ item.id }
                          item={ item }
                          onJsonClick={ this.handleJsonClick }
                          style={ style }
                        />
                      );
                    } }
                  </List>
                )}
              </Observer>
            )}
          </AutoSizer>
        </div>
        <Modal
          className={ classes.JsonViewer }
          isVisible={ json !== undefined }
          onCancel={ () => this.setState({ json: undefined }) }
          attach='right'
        >
          <PrettyJson value={ json } />
        </Modal>
      </div>
    );
  }
}

export default injectSheet(styles)(observer(ReadModelConsole));
