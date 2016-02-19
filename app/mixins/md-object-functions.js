import Ember from 'ember';

export default Ember.Mixin.create({
  loadContacts: function() {
    // load contact list for routes and components
    let contactPromise = this.get('store').findAll('contact');
    let contacts = [];
    contactPromise.then(function (contactArray) {
      contactArray.forEach(function (contact) {
        let recordId = contact.get('id');
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
        myContact['recordId'] = recordId;
        contacts.pushObject(myContact);
      });
    });
    this.mdLists.set('contactList', contacts);
  }
});
