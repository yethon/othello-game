import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

const gameStub = Service.extend({
  executePlay() {
  }
});

moduleForComponent('board-grid', 'Integration | Component | board grid', {
  integration: true,
  beforeEach: function () {
    this.register('service:game-service', gameStub);
    this.inject.service('game-service', { as: 'gameService' });
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{board-grid}}`);

  assert.equal(this.$().text().trim(), '');
});
