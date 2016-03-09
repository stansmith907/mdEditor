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
  }),

  panelId: Ember.computed(function () {
    return Ember.generateGuid(null, 'panel');
  }),



  didInsertElement: function() {
    console.log('+-- in didInsert');
    let panel = this.get('panelId') + 'a';
    let panelBtn = panel + '-btn';
    $('#' + panel).on('show.bs.collapse', function() {
      $('#' + panelBtn).removeClass('md-button-hide');
    });
    $('#' + panel).on('hidden.bs.collapse', function() {
      $('#' + panelBtn).addClass('md-button-hide');
    });
  }



});
