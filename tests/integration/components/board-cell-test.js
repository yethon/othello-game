import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('board-cell', 'Integration | Component | board cell', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{board-cell}}`);

  assert.equal(this.$().text().trim(), '');
});
