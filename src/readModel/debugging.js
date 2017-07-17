import { extendObservable } from 'mobx';

const debugging = extendObservable({}, {
  selectedReadModel: '',
  selectedReadModelItems: [],
  collectedEvents: []
});

export default debugging;
