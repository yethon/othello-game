import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  game: service('game'),

  init () {
    this._super(...arguments);
    this.get('game').initializeBoard();
  }
});
