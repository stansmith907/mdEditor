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
        console.log('+--- update contact successful');
        console.log('+--- updated contact ID:', model.id);
        this.transitionTo('contacts');
      }, function () {
        console.log('+--- update contact failed');
      });
    },

    cancelContact: function() {
      this.transitionTo('contacts');
    },

    deleteContact: function() {
      if (window.confirm("Do you really want to delete this contact?")) {
        let model = this.modelFor('contact.show.edit');
        model.destroyRecord().then(() => {
          console.log('+--- delete contact successful');
          console.log('+--- deleted contact ID:', model.id);
          this.transitionTo('contacts');
        }, function () {
          console.log('+--- delete contact failed');
        });
      }
    },

    addOnlineResource: function() {
      console.log('+- in addOnlineResource()');
    },

    editOnlineResource: function() {
      console.log('+- in editOnlineResource()');
    }
  }
});
