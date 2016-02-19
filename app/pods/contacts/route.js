import Ember from 'ember';
import MdObjectFunctions from '../../mixins/md-object-functions';

export default Ember.Route.extend(MdObjectFunctions, {
  model() {
    return this.store.findAll('contact');
  },

  actions: {
    deleteItem: function(item) {
      let _this = this;
      if (window.confirm(
              "Do you really want to delete this contact?\n\n" +
              "Be sure this contact is not referenced by a metadata record or dictionary " +
              "or it's deletion may cause those records to not validate.")) {
        item.destroyRecord().then(function() {
          console.log('+-- deleted contact ID:', item.id);
          // load contact list from mixin
          _this.loadContacts();
        }, function() {
          console.log('+--- delete contact failed');
        });
      }
    },

    editItem: function(items, index) {
      this.set('editing', items.objectAt(index));
    }
  }

});
