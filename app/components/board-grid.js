import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'div',
  classNames: 'board-grid',
  game: service('game'),

  actions: {
    playTurn (row, column) {
      this.get('game').executePlay(row, column);
    }
  }
});
