import Ember from 'ember';

export default Ember.Component.extend({
  
  /**
   * mdEditor class for input and edit of mdJSON address objects. 
   * 
   * @class md-address
   * @constructor
   */
  
  /**
   * mdJSON 'address' object to be edited. 
   * 
   * @property address
   * @type Object
   * @required
   */
  
  panelId: Ember.computed(function() {
    return Ember.generateGuid(null, 'panel');
  }),
  
  addressObj: Ember.computed('address', function() {
    let address = this.get('address');
    return (Object.keys(address).length === 0);
  })
  
});
