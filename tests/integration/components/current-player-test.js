import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('current-player', 'Integration | Component | current player', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{current-player}}`);

  assert.equal(this.$().text().trim(), `current player: WHITE`);
});
