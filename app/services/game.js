import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';

const DIRECTIONS = [[ -1, 0], [ 1, 0], [ 0, 1], [ 0, -1], [1, 1], [1, -1], [-1,1], [-1, -1]],
  BOARD_SIZE  = 8;

export default Service.extend({
  board: EmberObject.extend({}).create(),
  currentPlayer: 0,
  PLAYER_BLUE: -1,
  PLAYER_RED: 1,
  PLAYER_NONE: 0,

  currentPlayerText: computed('currentPlayer', {
    get() {
      return `current player: ${this.get('currentPlayer') === this.get('PLAYER_BLUE') ? 'BLUE' : 'RED'}`;
    }
  }),

  initializeBoard () {
    this.get('board');
    let t_row, r, c, cellInitialized, rowKey, cellKey;

    //setup initial board state
    //    - all empty, except middle 4 sqares which are alternating colors
    //        ( i.e. [3,3] = red, [3,4] = blue, [4,3] = red, [4,4] = blue )
    for (r = 0; r <BOARD_SIZE; r += 1) {
      rowKey = `${r}`;
      t_row = EmberObject.extend({}).create();

      for (c = 0; c < BOARD_SIZE; c += 1) {
        cellInitialized = false;
        cellKey = `${c}`;

        if (r === 3) {
          if (c === 3) {
            t_row[`${cellKey}`] = this.get('PLAYER_RED');
            cellInitialized = true;
          } else if (c === 4) {
            t_row[`${cellKey}`] = this.get('PLAYER_BLUE');
            cellInitialized = true;
          }
        } else if (r === 4) {
          if (c === 3) {
            t_row[`${cellKey}`] = this.get('PLAYER_BLUE');
            cellInitialized = true;
          } else if (c === 4) {
            t_row[`${cellKey}`] = this.get('PLAYER_RED');
            cellInitialized = true;
          }
        }
        if (!cellInitialized) {
          t_row[`${cellKey}`] = this.get('PLAYER_NONE');
        }
      }
      this.get('board').set(`${rowKey}`,t_row);
    }

    this.set('currentPlayer', this.get('PLAYER_BLUE'));
  },

  isOnBoard (row, column) {
    return ![row, column].includes(-1) && ![row, column].includes(8);
  },

  emptyCell(row, column) {
    return this.get('board').get(`${row}`).get(`${column}`) === 0;
  },

  opponentCell(row, column) {

   return this.get('board').get(`${row}`).get(`${column}`) !== this.get('currentPlayer');
  },

  didOutflankOpponent (row, column) {

    return this.get('board').get(`${row}`).get(`${column}`) === this.get('currentPlayer');
  },

  flipRow(cells) {
    cells.forEach(([row, column]) => {
      this.get('board').get(`${row}`).set(`${column}`, this.get('currentPlayer'));
    });
  },

  executePlay (row, column) {
    let validChoice = false;
    let cells = [];
    row = parseInt(row);
    column = parseInt(column);

    DIRECTIONS.forEach(([x, y]) => {
      // TODO: Refactor

      let i = x;
      let j = y;

      if (this.emptyCell(row, column) &&
        this.isOnBoard(row + i, column + j) &&
        this.opponentCell(row + i, column + j)) {

        cells = [];

        while (this.isOnBoard(row + i, column + j) &&
          !this.emptyCell(row + i, column + j)) {

          cells.push([row + i, column + j])

          // TODO: Could be refactored
          if (this.didOutflankOpponent(row + i, column + j)) {
            console.warn(`DIRECTION: ${x},${y}`);
            this.flipRow(cells);
            cells = [];
            validChoice = true;
            break;
          }

          i = i + x;
          j = j + y;
        }

      }
    });


    if (validChoice) {
      this.get('board').get(`${row}`).set(`${column}`, this.get('currentPlayer'));
      this.set('currentPlayer', this.get('currentPlayer') * -1);
    }

  }
});
