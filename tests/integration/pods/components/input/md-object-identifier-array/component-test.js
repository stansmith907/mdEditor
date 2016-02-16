import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-object-identifier-array', 'Integration | Component | input/md object identifier array', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{input/md-object-identifier-array}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#input/md-object-identifier-array}}
      template block text
    {{/input/md-object-identifier-array}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
