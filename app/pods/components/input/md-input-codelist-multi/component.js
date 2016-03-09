import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * [service description]
   * @param  {[type]} 'codelist' [description]
   * @return {[type]}            [description]
   */
  mdCodes: Ember.inject.service('codelist'),

  /**
   * [create description]
   * @type {Boolean}
   */
  create: false,

  /**
   * [tooltip description]
   * @type {Boolean}
   */
  tooltip: false,

  /**
   * [mdCodeName description]
   * @type {String} mdCodeName
   */

  /**
   * [placeholder description]
   * @type {String}
   */
  placeholder: "Select one or more options",

  /**
   * [label description]
   * @type {String} label
   */

  /**
   * [width description]
   * @type {String} width
   */
  width: "100%",

  /**
   * codelist is an array of code objects in mdCodelist format
   * the initial codelist for 'mdCodeName' is pulled from the 'codelist' service;
   * then if a new value was created by the user a new object will be added into the codelist;
   * then a new 'selected' element will be added to each codelist object to let select2
   * and the template <option> tag know this item should be selected.
   *
   * @return {array}
   */
  codelist: Ember.computed(function() {
    let codelist = [];
    let codelistName = this.get('mdCodeName');
    let mdCodelist = this.get('mdCodes')
        .get(codelistName)
        .codelist
        .sortBy('codeName');
    mdCodelist.forEach(function(item) {
      let newObject = {
        code: item['code'],
        codeName: item['codeName'],
        description: item['description'],
        selected: false
      };
      codelist.pushObject(newObject);
    });

    let selectedItems = this.get('value');
    let create = this.get('create');
    if (selectedItems) {
      if (create) {
        selectedItems.forEach(function(selectedItem) {
          let mdIndex = -1;
          codelist.forEach(function(codeObject, cIndex) {
            if (selectedItem === codeObject['codeName']) {
              mdIndex = cIndex;
            }
          });
          if (mdIndex === -1) {
            let newObject = {
              code: Math.floor(Math.random() * 100000) + 1,
              codeName: selectedItem,
              description: 'Undefined',
              selected: false
            };
            codelist.pushObject(newObject);
          }
        });
      }
      codelist.forEach(function(item) {
        let mdIndex = selectedItems.indexOf(item['codeName']);
        if (mdIndex > -1) {
          item['selected'] = true;
        }
      });
    }

    return codelist;
  }),

  // Format options for the select tag
  // Add tooltips if requested
  didInsertElement: function() {
    let tooltip = this.get('tooltip');

    function formatOption(option) {
      let text = option['text'];
      let $option = $(`<div> ${text}</div>`);

      if (tooltip) {
        let tip = $(option.element).data('tooltip');

        $option = $option.append(
            $(
                `<span class="badge pull-right" data-toggle="tooltip"
            data-placement="left" data-container="body"
            title="${tip}">?</span>`
            )
                .on('mousedown', function(e) {
                  $(e.target).tooltip('destroy');
                  return true;
                })
                .tooltip());
      }
      return $option;
    }

    this.$(".md-input-codelist-multiple").select2({
      placeholder: this.get('placeholder'),
      tags: this.get('create'),
      templateResult: formatOption,
      width: this.get('width'),
      minimumResultsForSearch: 10,
      theme: 'bootstrap'
    });
  },

  actions: {
    // do the binding to value
    setValue: function () {
      let selectedEl = this.$('select');
      let selectedValue = selectedEl.val();
      this.set('value', selectedValue);
    }
  }

});
