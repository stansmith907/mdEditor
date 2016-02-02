import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('dashboard');
  this.route('export');
  this.route('import');
  this.route('translate');
  this.route('publish');
  this.route('help');
  //records
  this.route('records');
  //record
  this.route('record', function () {
    this.route('new');
    this.route('show', {
        path: ':record_id'
      },
      function () {
        this.route('edit', function () {
          this.route('keywords');

          this.route('spatial');

          this.route('quality');

          this.route('distribution');

          this.route('associated');

          this.route('documents');

          this.route('dictionaries');

          this.route('coverages');

          this.route('grid');
          this.route('main');
        });
      }
    );
  });
  //contacts
  this.route('contacts');
  //contact
  this.route('contact', function () {
    this.route('new');

    this.route('show', {
      path: ':contact_id'
    }, function () {
      this.route('edit', {
        path: 'edit'
      });

    });

  });
  //dictionaries
  this.route('dictionaries', function () {
    this.route('new');

    this.route('show', {
      path: 'dictionaries/:dictionary_id/show'
    });

    this.route('edit', {
      path: 'dictionaries/:dictionary_id/edit'
    });

    this.route('domains', {
      path: 'dictionaries/:dictionary_id/domains'
    });

    this.route('entities', {
      path: 'dictionaries/:dictionary_id/entities'
    });
  });
  this.route('settings');
});

export default Router;
