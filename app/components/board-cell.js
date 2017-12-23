import Component from '@ember/component';
import { computed } from '@ember/object';
import { PLAYER_BLACK, PLAYER_WHITE } from 'othello-game/services/game';

export default Component.extend({
  tagName: 'div',
  classNames: 'cell',
  classNameBindings: ['black', 'white'],
  black: computed ('contents', {
    get() {
      return this.get('contents') === PLAYER_BLACK;
    }
  }),
  white: computed ('contents', {
    get() {
      return this.get('contents') === PLAYER_WHITE;
    }
  }),

  init () {
    this._super(...arguments);
    this.set('elementId', `r${this.get('rowIndex')}_c${this.get('columnIndex')}`);
  }
});
