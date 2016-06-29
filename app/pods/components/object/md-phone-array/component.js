import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * mdEditor class for input and edit of mdJSON 'phone' object.
   * The class manages the maintenance of an array of phone objects.
   *
   * @class md-phone-array
   * @constructor
   */

  /**
   * An array of mdJSON phone objects.  
   *
   * @property phoneBook
   * @type Array
   * @required
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
  
  panelId: Ember.computed(function() {
    return Ember.generateGuid(null, 'panel');
  }),
  
  recordCount: Ember.computed('phoneBook.[]', 'badgeColor', function() {
    return this.get('phoneBook').length;;
  }),
    
  badgeColor: Ember.computed('recordCount', function() {
    var count = this.get('recordCount');
    return (count > 0) ? 'label-info' : 'label-warning';
  }),
  
// didInsertElement: function() {
  //   let panel = this.get('panelId');
  //   let panelBtn = panel + '-btn';
  //   $('#' + panel).on('show.bs.collapse', function() {
  //     $('#' + panelBtn).removeClass('md-button-hide');
  //   });
  //   $('#' + panel).on('hidden.bs.collapse', function() {
  //     $('#' + panelBtn).addClass('md-button-hide');
  //   });
  // },
  
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
    }
  }
  
});
