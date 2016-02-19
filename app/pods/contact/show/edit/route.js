import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });
  },

  panelId: Ember.computed(function () {
    return Ember.generateGuid(null, 'panel');
  }),

  actions: {
    addPhone: function(phoneBook) {
      phoneBook.pushObject(Ember.Object.create({
        phoneName: "",
        phoneNumber: "",
        service: []
      }));
    },

    deletePhone: function(phoneBook, idx) {
      phoneBook.removeAt(idx);
    },

    saveContact: function() {
      let model = this.modelFor('contact.show.edit');
      model.save().then(() => {
        console.log('+--- updated contact ID:', model.id);
        this.transitionTo('contacts');
      }, function () {
        console.log('+--- update contact failed');
      });
    },

    cancelContact: function() {
      this.transitionTo('contacts');
    },

    addOnlineResource: function() {
      console.log('+- in addOnlineResource()');
    },

    editOnlineResource: function() {
      console.log('+- in editOnlineResource()');
    }
  }
});
