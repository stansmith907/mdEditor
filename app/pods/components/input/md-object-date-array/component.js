import Ember from 'ember';

export default Ember.Component.extend({
  dateArray2: Ember.computed('model', function() {
    if (this.get('model.' + this.get('propertyArrayName')) === undefined) {
      this.set('model.' + this.get('propertyArrayName'), []);
    }
    return this.get('model.' + this.get('propertyArrayName'));
  }),

  panelId: Ember.computed(function() {
    return Ember.generateGuid(null, 'panel');
  }),

  actions: {
    addDate: function(model) {
      if (model[this.get('propertyArrayName')] === undefined) {
        model[this.get('propertyArrayName')] = [];
      }
      model[this.get('propertyArrayName')].pushObject({});
    },
    deleteDate: function(items, index) {
      if (window.confirm("Do you really want to delete this date item?")) {
        items.removeAt(index);
      }
    }
  }
});