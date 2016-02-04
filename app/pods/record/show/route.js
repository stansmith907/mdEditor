import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.Object.create({
      id: params.record_id
    });
  },
  renderTemplate() {
    this.render('records.nav', {
      into: 'application',
      outlet: 'nav'
    });
    this.render('record.show', {
      into: 'record'
    });
  }
});
