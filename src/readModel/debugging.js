import { extendObservable } from 'mobx';

const debugging = extendObservable({}, {
  selectedReadModel: 'none',
  selectedReadModelItems: [],
  collectedEvents: []
});

export default debugging;
