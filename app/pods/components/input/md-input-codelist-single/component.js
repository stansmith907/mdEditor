import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * [service description]
   * @param  {[type]} 'codelist' [description]
   * @return {[type]}            [description]
   */
  mdCodes: Ember.inject.service('codelist'),

  /**
   * [service description]
   * @return {Object} [description]
   */
  icons: Ember.inject.service('icon'),

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
   * [icon description]
   * @type {Boolean}
   */
  icon: false,

  /**
   * [allowClear description]
   * @type {Boolean}
   */
  allowClear: false,

  /**
   * [mdCodeName description]
   * @type {String} mdCodeName
   */

  /**
   * [placeholder description]
   * @type {String}
   */
  placeholder: "Select one option",

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
   * [disabled description]
   * @type {Boolean} width
   */
  disabled: false,

  /**
   * codelist is an array of code objects in mdCodelist format
   * the initial codelist for 'mdCodeName' is pulled from the 'codelist' service;
   * then if a new value was created by the user a new object will be added into the codelist;
   * then a new 'selected' element will be added to each codelist object to let select2
   * know if this item should be selected.
   *
   * @return {Array}
   */
  codelist: Ember.computed('value', function() {
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

    let selectedItem = this.get('value');
    let create = this.get('create');
    if (selectedItem) {
      if (create) {
        let index = mdCodelist.indexOf(selectedItem);
        if (index === -1) {
          let newObject = {
            code: Math.floor(Math.random() * 100000) + 1,
            codeName: selectedItem,
            description: 'Undefined',
            selected: false
          };
          codelist.pushObject(newObject);
        }
      }

      codelist.forEach(function(item) {
        item['selected'] = (item['codeName'] === selectedItem);
      });
    }

    return codelist;
  }),

  // Format options for the select tag
  // Add tooltips,icons if requested
  didInsertElement: function() {
    let tooltip = this.get('tooltip');
    let icon = this.get('icon');
    let icons = this.get('icons');

    function formatOption(option) {
      let text = option['text'];
      let $option = $(`<div> ${text}</div>`);

      if (icon) {
        $option.prepend(
            `<span class="fa fa-${icons.get(text) || icons.get('defaultList')}"> </span>`
        );
      }

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

    this.$('.md-input-codelist-single').select2({
      placeholder: this.get('placeholder'),
      allowClear: this.get('allowClear'),
      tags: this.get('create'),
      templateResult: formatOption,
      width: this.get('width'),
      minimumResultsForSearch: 10,
      theme: 'bootstrap'
    });
  },

  didRender() {
    this.$('.md-input-codelist-single').trigger('change.select2');
  },

  actions: {
    // do the binding to value
    setValue: function() {
      let selectedEl = this.$('select');
      let selectedValue = selectedEl.val();
      this.set('value', selectedValue);
    }
  }

});
