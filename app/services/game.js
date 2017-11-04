import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';

const DIRECTIONS = {
  N:  [ -1, 0],
  NE: [ -1,1],
  E:  [ 0, 1],
  SE: [ 1, 1],
  S:  [ 1, 0],
  SW: [ 1, -1],
  W:  [ 0, -1],
  NW: [ -1, -1]
},
  BOARD_SIZE  = 8;

export const PLAYER_Y = -1;
export const PLAYER_X  = 1;
export const PLAYER_NONE = 0;

export default Service.extend({
  board: [],
  currentPlayer: 0,

  currentPlayerText: computed('currentPlayer', {
    get() {
      return `current player: ${this.get('currentPlayer') === PLAYER_Y ? 'BLUE' : 'RED'}`;
    }
  }),

  initializeBoard () {
    let t_row, r, c, cellInitialized, cellKey;

    //setup initial board state
    //    - all empty, except middle 4 sqares which are alternating colors
    //        ( i.e. [3,3] = red, [3,4] = blue, [4,3] = red, [4,4] = blue )
    for (r = 0; r < BOARD_SIZE; r += 1) {
      t_row = EmberObject.extend({}).create();

      for (c = 0; c < BOARD_SIZE; c += 1) {
        cellInitialized = false;
        cellKey = `${c}`;

        if (r === 3) {
          if (c === 3) {
            t_row[`${cellKey}`] = PLAYER_X;
            cellInitialized = true;
          } else if (c === 4) {
            t_row[`${cellKey}`] = PLAYER_Y;
            cellInitialized = true;
          }
        } else if (r === 4) {
          if (c === 3) {
            t_row[`${cellKey}`] = PLAYER_Y;
            cellInitialized = true;
          } else if (c === 4) {
            t_row[`${cellKey}`] = PLAYER_X;
            cellInitialized = true;
          }
        }
        if (!cellInitialized) {
          t_row[`${cellKey}`] = PLAYER_NONE;
        }
      }
      this.get('board').push(t_row);
    }

    this.set('currentPlayer', PLAYER_Y);
  },

  _isOnBoard (row, column) {

    return ![row, column].includes(-1) && ![row, column].includes(8);
  },

  _emptyCell(row, column) {

    return this.get('board')[row].get(`${column}`) === 0;
  },

  _opponentCell(row, column) {

    return this.get('board')[row].get(`${column}`) !== this.get('currentPlayer');
  },

  _didOutflankOpponent (row, column) {

    return this.get('board')[row].get(`${column}`) === this.get('currentPlayer');
  },

  _flipRow(cells) {

    cells.forEach(([row, column]) => {
      this.get('board')[row].set(`${column}`, this.get('currentPlayer'));
    });

  },

  executePlay (row, column) {
    let validChoice = false;
    let cells = [];
    row = parseInt(row);
    column = parseInt(column);

    Object.entries(DIRECTIONS).forEach(([direction, [r, c]]) => {
      let i = r;
      let j = c;

      if (this._emptyCell(row, column) &&
        this._isOnBoard(row + i, column + j) &&
        this._opponentCell(row + i, column + j)) {

        cells = [];

        while (this._isOnBoard(row + i, column + j) &&
          !this._emptyCell(row + i, column + j)) {

          cells.push([row + i, column + j])

          if (this._didOutflankOpponent(row + i, column + j)) {
            console.warn(`${direction}`);
            this._flipRow(cells);
            cells = [];
            validChoice = true;
            break;
          }

          i = i + r;
          j = j + c;
        }

      }
    });

    if (validChoice) {
      this.get('board')[row].set(`${column}`, this.get('currentPlayer'));
      this.set('currentPlayer', this.get('currentPlayer') * -1);
    }

  }
});
