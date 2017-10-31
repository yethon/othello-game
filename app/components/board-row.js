import Component from '@ember/component';

export default Component.extend({
  tagName: 'tr',
  classNames: 'row',

  init() {
    this._super(...arguments);
    this.set('elementId', `r${this.get('rowIndex')}`);
  }
});
