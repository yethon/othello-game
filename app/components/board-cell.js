import Component from '@ember/component';
import { computed } from '@ember/object';
import { PLAYER_Y, PLAYER_X } from 'othello-game/services/game';

export default Component.extend({
  tagName: 'td',
  classNames: 'cell',
  classNameBindings: ['blue', 'red'],
  blue: computed ('contents', {
    get() {
      return this.get('contents') === PLAYER_Y;
    }
  }),
  red: computed ('contents', {
    get() {
      return this.get('contents') === PLAYER_X;
    }
  }),

  init () {
    this._super(...arguments);
    this.set('elementId', `r${this.get('rowIndex')}_c${this.get('columnIndex')}`);
  }
});
