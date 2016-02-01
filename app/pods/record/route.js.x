import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    /*if (model.get('length') === 0) {
      this.transitionTo('record.new');
    }*/
    console.info(arguments);
  }

});
