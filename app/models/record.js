import Ember from 'ember';
import DS from 'ember-data';
import UUID from "npm:node-uuid";

export default DS.Model.extend({
  profile: DS.attr('string', {
    defaultValue: 'full'
  }),
  json: DS.attr('json', {
    defaultValue() {
      const obj = {
        "version": {
          "name": "mdJson",
          "version": "1.0.0"
        },
        "contact": [],
        "metadata": {
          "metadataInfo": {
            "metadataIdentifier": {
              "identifier": UUID.v4(),
              "type": "uuid"
            }
          },
          "resourceInfo": {
            "resourceType": null,
            "citation": {
              "title": "My Record",
              "date": [{
                "date": new Date()
                  .toISOString(),
                "dateType": "creation"
              }]
            },
            "pointOfContact": [],
            "abstract": null,
            "status": null,
            "language": ["eng; USA"]
          }
        }
      };

      return obj;
    }
  }),

  title: Ember.computed('mdJson', function () {
    return this.get('mdJson')
      .metadata.resourceInfo.citation.title;
  })
});
