import Ember from 'ember';

export default Ember.Controller.extend({
  /**
   * [service description]
   * @param  {[type]} 'codelist' [description]
   * @return {[type]}            [description]
   */
  mdCodes: Ember.inject.service('codelist'),

  phoneServices: Ember.computed(function() {
    let mdCodelist = this.get('mdCodes')
        .get('telephone')
        .codelist;
    let serviceType = [];
    mdCodelist.forEach(function(telephone) {
      serviceType.push(telephone['codeName']);
    });
    return serviceType;
  })

});
