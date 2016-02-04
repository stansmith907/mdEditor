import DS from 'ember-data';

export default DS.Model.extend({
  json: DS.attr('json', {
      defaultValue() {
        const obj = {
            "dictionaryInfo" : {
            "citation": {
              "title": "Project Metadata Database",
              "date": [{
                "date": new Date().toISOString(),
                "dateType": "creation"
              }]
            },
            "description":"Data dictionary.",
            "resourceType": null
          },
          "domain": [],
          "entity": []
      };

      return obj;
    }
  })
});
