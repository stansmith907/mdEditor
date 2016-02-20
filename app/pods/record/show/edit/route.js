import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Edit',
    linkable: false
  },

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: Ember.inject.service(),

  /**
   * The route activate hook, sets the profile.
   */
  afterModel(model) {
    this.get('profile')
      .set('active', model.get('profile'));
  },

  /**
   * [renderTemplate description]
   * @param  {[type]} controller [description]
   * @param  {[type]} model      [description]
   * @return {[type]}            [description]
   */
  renderTemplate(controller, model) {
    this.render('record.show.edit.nav', {
      into: 'records.nav'
    });
    this.render('nav-secondary', {
      into: 'application',
      outlet: 'nav-secondary'
    });
    this.render('record.show.edit', {
      into: 'record',
      model: model
    });
  },

  actions: {
    saveRecord: function() {
      let model = this.modelFor('record.show.edit');
      model.save().then(() => {
        console.log('+--- update record successful');
        console.log('+--- updated record ID:', model.id);
        this.transitionTo('records');
      }, function() {
        console.log('+--- update record failed');
      });
    },

    cancelRecord: function() {
      this.transitionTo('records');
    }

  }

});
