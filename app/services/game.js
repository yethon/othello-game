import Service from '@ember/service';

const DIRECTIONS = [[ -1, 0], [ 1, 0], [ 0, 1], [ 0, -1], [1, 1], [1, -1], [-1,1], [-1, -1]],
  BOARD_SIZE  = 8;

export default Service.extend({
  board: [],
  currentPlayer: 0,
  PLAYER_BLUE: -1,
  PLAYER_RED: 1,
  PLAYER_NONE: 0,

  initializeBoard () {
    let t_row, r, c, cellInitialized;

    //setup initial board state
    //    - all empty, except middle 4 sqares which are alternating colors
    //        ( i.e. [3,3] = red, [3,4] = blue, [4,3] = red, [4,4] = blue )
    for (r = 0; r <BOARD_SIZE; r += 1) {
      t_row = []
      for (c = 0; c < BOARD_SIZE; c += 1) {
        cellInitialized = false;
        if (r === 3) {
          if (c === 3) {
            t_row.push(this.get('PLAYER_RED'));
            cellInitialized = true;
          } else if (c === 4) {
            t_row.push(this.get('PLAYER_BLUE'));
            cellInitialized = true;
          }
        } else if (r === 4) {
          if (c === 3) {
            t_row.push(this.get('PLAYER_BLUE'));
            cellInitialized = true;
          } else if (c === 4) {
            t_row.push(this.get('PLAYER_RED'));
            cellInitialized = true;
          }
        }
        if (!cellInitialized) {
          t_row.push(this.get('PLAYER_NONE'));
        }
      }
      this.get('board').push(t_row);
    }

    this.set('currentPlayer', this.get('PLAYER_BLUE'));
  },

  isOnBoard (row, column) {
    return ![row, column].includes(-1) && ![row, column].includes(8);
  },

  emptyCell(row, column) {
    return this.get('board')[row][column] === 0;
  },

  opponentCell(row, column) {
    const checkValue = this.get('board')[row][column];

    return checkValue !== this.get('currentPlayer');
  },

  didOutflankOpponent (row, column) {
    return this.get('board')[row][column] === this.get('currentPlayer');
  },

  flipRow(cells) {
    cells.forEach(([row, column]) => {
      this.get('board')[row][column] = this.get('currentPlayer');
    });
  },

  executePlay (row, column) {
    let validChoice = false;

    DIRECTIONS.forEach(([x, y]) => {
      // TODO: Refactor

      let i = x;
      let j = y;
      let cells = [];

      if (this.emptyCell(row, column) &&
        this.isOnBoard(row + i, column + j) &&
        this.opponentCell(row + i, column + j)) {

        cells = [];

        while (this.isOnBoard(row + i, column + j) &&
          !this.emptyCell(row + i, column + j)) {

          cells.push([row + i, column + j])

          if (this.didOutflankOpponent(row + i, column + j)) {
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
      const board = this.get('board');

      board[row][column] = this.currentPlayer;

      this.set('board', board);
      this.set('currentPlayer', this.get('currentPlayer') * -1);
    }

  }
});
