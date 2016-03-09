import Ember from 'ember';

export default Ember.Component.extend({
  // build a selection list of current contacts for responsibleParty.
  // the contact list is built from a query of all contacts in the data store.
  // the query returns a promise that must be resolved before the embedded
  // md-input-codelist-single-obj component is called or the contact list
  // will be empty.
  //
  // a mdJson contact may be either an organization or individual contact.
  // insert a new object element that combines organization and individual name
  // for selection purposes.
  // use the combined name in the selection list.
  store: Ember.inject.service('store'),
  contactList: Ember.computed(function() {
    let contactPromise = this.get('store')
        .findAll('contact')
        .then(function(contacts) {
          return contacts;
        });
    return contactPromise;
  }),

  resPartyArray: Ember.computed('model', function() {
    if (this.get('model.' + this.get('propertyArrayName')) === undefined) {
      this.set('model.' + this.get('propertyArrayName'), []);
    }
    return this.get('model.' + this.get('propertyArrayName'));
  }),

  panelId: Ember.computed(function() {
    return Ember.generateGuid(null, 'panel');
  }),

  didInsertElement: function() {
    let panel = this.get('panelId');
    let panelBtn = panel + '-btn';
    $('#' + panel).on('show.bs.collapse', function() {
      $('#' + panelBtn).removeClass('md-button-hide');
    });
    $('#' + panel).on('hidden.bs.collapse', function() {
      $('#' + panelBtn).addClass('md-button-hide');
    });
  },

  actions: {
    addResParty: function(model) {
      if (model[this.get('propertyArrayName')] === undefined) {
        model[this.get('propertyArrayName')] = [];
      }
      return model[this.get('propertyArrayName')].pushObject({});
    },
    deleteResParty: function(items, index) {
      if (window.confirm("Do you really want to delete this responsible party item?")) {
        items.removeAt(index);
      }
      return false;
    }

  }
});
