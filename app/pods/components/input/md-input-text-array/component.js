import Ember from 'ember';

export default Ember.Component.extend({
  items: Ember.computed('model.[]', {
    get(key) {
      let items = this.get('model');
      if (items === undefined) {
        items = [];
      }
      return items.reduce(function (acc, val) {
        acc.pushObject({
          val: val
        });
        return acc;
      }, []);
    },
    set(key, value) {
      this.set('model', value
          .filterBy('val').mapBy('val'));
      return value;
    }
  }),

  itemsObserver: Ember.observer('items.@each.val', function () {
    this.set('items', this.get('items'));
  }),

  actions: {
    addItem(model) {
      model.pushObject({
        val: ''
      });
    },
    deleteItem(model, idx) {
      model.removeAt(idx);
    }
  }

});
