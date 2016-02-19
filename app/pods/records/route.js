import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render('records.nav', {
      into: 'application',
      outlet: 'nav'
    });
    this.render('records', {
      into: 'application'
    });
  }

});
