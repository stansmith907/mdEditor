import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });

    console.log('+-- in didInsert', this.get('panelId'));
    let panel = this.get('panelId') + 'a';
    let panelBtn = panel + '-btn';
    $('#' + panel).on('show.bs.collapse', function() {
      $('#' + panelBtn).removeClass('md-button-hide');
    });
    $('#' + panel).on('hidden.bs.collapse', function() {
      $('#' + panelBtn).addClass('md-button-hide');
    });
  },

  //panelId: Ember.computed(function () {
  //  return Ember.generateGuid(null, 'panel');
  //}),
  //
  //didInsertElement: function() {
  //  console.log('+-- in didInsert');
  //  let panel = this.get('panelId') + 'a';
  //  let panelBtn = panel + '-btn';
  //  $('#' + panel).on('show.bs.collapse', function() {
  //    $('#' + panelBtn).removeClass('md-button-hide');
  //  });
  //  $('#' + panel).on('hidden.bs.collapse', function() {
  //    $('#' + panelBtn).addClass('md-button-hide');
  //  });
  //},

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
