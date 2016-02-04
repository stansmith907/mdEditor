import DS from 'ember-data';
import UUID from "npm:node-uuid";

export default DS.Model.extend({
  mdcontact: DS.attr('json', {
    defaultValue: function () {
      var obj = {
        "contactId": UUID.v4(),
        "organizationName": null,
        "individualName": "New Contact",
        "positionName": null,
        "phoneBook": [],
        "address": {},
        "onlineResource": [],
        "contactInstructions": null
      };
      return obj;
    }
  })
});
