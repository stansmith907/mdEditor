import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * Models for sidebar navigation
   *
   * @return {Ember.RSVP.hash}
   */
  model() {
    let promises = [this.store.findAll('record'),
      this.store.findAll('contact'),
      this.store.findAll('dictionary')
    ];

    let meta = [{
      type: 'record',
      list: 'records',
      title: 'Metadata Records'
    }, {
      type: 'contact',
      list: 'contacts',
      title: 'Contacts'
    }, {
      type: 'dictionary',
      list: 'dictionaries',
      title: 'Dictionaries'
    }];

    let idx = 0;

    let mapFn = function(item) {

      meta[idx].listId = Ember.guidFor(item);
      item.meta = meta[idx];
      idx = ++idx;

      return item;
    };

    return Ember.RSVP.map(promises, mapFn);
  },

  afterModel: function() {

    // load contact list for routes and components
    let contactPromise = this.get('store').findAll('contact');
    let contacts = [];
    contactPromise.then(function (contactArray) {
      contactArray.forEach(function (contact) {
        let myContact = contact.get('json');
        let orgName = myContact['organizationName'];
        let indName = myContact['individualName'];
        let combinedName = "";
        if (orgName && indName) {
          combinedName = orgName + ": " + indName;
        } else if (orgName) {
          combinedName = orgName;
        } else if (indName) {
          combinedName = indName;
        }
        myContact['combinedName'] = combinedName;
        contacts.pushObject(myContact);
      });
    });
    this.mdLists.set('contactList', contacts);
  }

});
