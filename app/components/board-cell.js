import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  game: service('game'),

  tagName: 'td',
  classNames: 'cell',
  classNameBindings: ['blue', 'red'],
  blue: computed ('contents', {
    get() {
      return this.get('contents') === this.get('game').PLAYER_BLUE;
    }
  }),
  red: computed ('contents', {
    get() {
      return this.get('contents') === this.get('game').PLAYER_RED;
    }
  }),

  init () {
    this._super(...arguments);
    this.set('elementId', `r${this.get('rowIndex')}_c${this.get('columnIndex')}`);
  },

  click() {
    console.warn(this.get('contents'));
    console.log(`Coordinate ::: [${this.get('rowIndex')}, ${this.get('columnIndex')}]`);

    this.get('game').executePlay(this.get('rowIndex'), this.get('columnIndex'), this.get('contents'));

    this.set('contents', -1);
    console.warn(this.get('contents'));
  }

});
