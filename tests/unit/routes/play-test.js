import { moduleFor, test } from 'ember-qunit';

moduleFor('route:play', 'Unit | Route | play', {
  needs: ['service:game']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
