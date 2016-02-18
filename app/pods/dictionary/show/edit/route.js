import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  profile: Ember.inject.service(),
  breadCrumb:{
    title: 'test'
  },
  /**
   * The route activate hook, sets the profile to 'dictionary'.
   */
  activate() {
    this.get('profile').set('active', 'dictionary');
  },

  renderTemplate() {
    this.render('nav-secondary', {
      into: 'application',
      outlet: 'nav-secondary'
    });
    this.render('dictionary.show.edit', {
      into: 'dictionary'
    });
  },

  actions: {
    saveDictionary: function() {
      let model = this.modelFor('dictionary.show.edit');
      model.save().then(() => {
        console.log('+--- update dictionary successful');
        console.log('+--- updated dictionary ID:', model.id);
        this.transitionTo('dictionaries');
      }, function() {
        console.log('+--- update dictionary failed');
      });
    },

    cancelDictionary: function() {
      this.transitionTo('dictionaries');
    },

    deleteDictionary: function() {
      if (window.confirm("Do you really want to delete this data dictionary?")) {
        let model = this.modelFor('dictionary.show.edit');
        model.destroyRecord().then(() => {
          console.log('+--- delete dictionary successful');
          console.log('+--- deleted dictionary ID:', model.id);
          this.transitionTo('dictionaries');
        }, function() {
          console.log('+--- delete dictionary failed');
        });
      }
    }
  }

});
