import Ember from 'ember';

export function initialize(application) {
  var mdLists = Ember.Object.extend();
  application.register('mdLists:main', mdLists);
  application.inject('route', 'mdLists', 'mdLists:main');
  application.inject('component', 'mdLists', 'mdLists:main');
}

export default {
  name: 'mdLists',
  initialize
};
