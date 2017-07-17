import { observer } from 'mobx-react';
import React from 'react';
import './ReadModelItem.css';

const ReadModelItem = function ({ item }) {
    /* eslint-disable no-extra-parens */
  return (
    <div className='wk-read-model-item'>
      { Object.keys(item).
        filter(key => key !== 'isAuthorized').
        map(itemKey => (
          <div className='wk-field' key={ itemKey }>
            <div className='wk-key'>{ itemKey }</div>
            <div className='wk-value'>{ JSON.stringify(item[itemKey]) }</div>
          </div>
        )
      )}
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default observer(ReadModelItem);
