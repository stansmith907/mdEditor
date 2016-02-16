import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * [objectArray description]
   * @type {Array} mdCodeName
   */

  /**
   * [valuePath description]
   * @type {String}
   */

  /**
   * [namePath description]
   * @type {String}
   */

  /**
   * [tooltipPath description]
   * @type {String}
   */
  tooltipPath: null,

  /**
   * [value description]
   * @type {Object}
   */

  /**
   * [allowClear description]
   * @type {Boolean}
   */
  allowClear: false,

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
   * codelist is an array of code objects re-mapped from the input 'objectArray'.
   * values from the input object array are mapped according the path parameters
   * provided. md-input-object-single does not allow creation of new objects.
   */
  codelist: Ember.computed(function() {
    let inList = this.get('objectArray');
    let codeId = this.get('valuePath');
    let codeName = this.get('namePath');
    let tooltip = this.get('tooltipPath');
    let selectedItem = this.get('value');
    let outList = [];
    inList.forEach(function(item) {
      let newObject = {
        codeId: item[codeId],
        codeName: item[codeName],
        tooltip: item[tooltip],
        selected: false
      };
      outList.pushObject(newObject);
    });

    if (selectedItem) {
      outList.forEach(function(item){
        item['selected'] = (item['codeId'] === selectedItem);
      });
    }
    return outList;
  }),

  // Format options for the select tag
  // Add tooltips if requested
  didInsertElement: function() {
    let tooltip = this.get('tooltipPath');
    let codelist = this.get('codelist');

    function formatOption(option) {
      let text = option['text'];
      let $option = $(`<div> ${text}</div>`);

      if (tooltip) {
        let found = codelist.findBy('codeName', option['id']);
        let tip = found ? found.description : 'Undefined';

        $option = $option.append(
            $(
                `<span class="badge pull-right" data-toggle="tooltip"
            data-placement="right" data-container="body"
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

    this.$(".md-input-object-single").select2({
      placeholder: this.get('placeholder'),
      allowClear: this.get('allowClear'),
      templateResult: formatOption,
      width: this.get('width'),
      minimumResultsForSearch: 10,
      theme: 'bootstrap'
    });
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
