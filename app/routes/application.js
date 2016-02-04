import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * Models for sidebar navigation
   *
   * @return {Ember.RSVP.hash}
   */
  model() {
    return Ember.RSVP.hash({
      records: this.store.findAll('record'),
      contacts: this.store.findAll('contact'),
      dictionaries: this.store.findAll('dictionary')
    });
  },
  afterModel(model) {
    model.recordsId = Ember.guidFor(model.records);
    model.contactsId = Ember.guidFor(model.contacts);
    model.dictionariesId = Ember.guidFor(model.dictionaries);

    return model;
  }
});
