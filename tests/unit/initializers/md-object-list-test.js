import Ember from 'ember';
import MdObjectListInitializer from '../../../app/initializers/md-object-list';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | md object list', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  MdObjectListInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
