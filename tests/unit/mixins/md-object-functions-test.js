import Ember from 'ember';
import MdObjectFunctionsMixin from '../../../mixins/md-object-functions';
import { module, test } from 'qunit';

module('Unit | Mixin | md object functions');

// Replace this with your real tests.
test('it works', function(assert) {
  let MdObjectFunctionsObject = Ember.Object.extend(MdObjectFunctionsMixin);
  let subject = MdObjectFunctionsObject.create();
  assert.ok(subject);
});
