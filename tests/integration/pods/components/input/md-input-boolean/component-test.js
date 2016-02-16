import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input/md-input-boolean', 'Integration | Component | input/md input boolean', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{input/md-input-boolean}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#input/md-input-boolean}}
      template block text
    {{/input/md-input-boolean}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
