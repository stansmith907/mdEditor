import Ember from 'ember';

export default Ember.Component.extend({
  dateObj2: Ember.computed('model', function() {
    if (this.get('model.' + this.get('propertyObjectName')) === undefined) {
      this.set('model.' + this.get('propertyObjectName'), {});
    }
    return this.get('model.' + this.get('propertyObjectName'));
  })
});
