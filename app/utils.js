const Utils = {
  DIMENSIONS: [3, 4, 5, 6, 7, 8, 9, 10],

  _getGameDimension(tiles) {
    return Math.floor(Math.sqrt(tiles.length));
  },

  _getEmptyPoint(tiles) {
    const dimension = this._getGameDimension(tiles), emptyIndex = this.getEmptyIndex(tiles);
    return {
      x: Math.floor(emptyIndex / dimension),
      y: emptyIndex % dimension,
    };
  },

  isValid(tiles) {
    const dimension = this._getGameDimension(tiles);
    for (let i = 0; i < dimension * dimension; i++) {
      if (tiles[i] !== i + 1) {
        return false;
      }
    }
    return true;
  },

  getEmptyIndex(tiles) {
    const dimension = this._getGameDimension(tiles);
    return tiles.indexOf(dimension * dimension);
  },

  canMove(tiles, x, y) {
    const empty = this._getEmptyPoint(tiles);
    return Math.abs(x - empty.x) + Math.abs(y - empty.y) === 1;
  },

  generateGame(dimension, level) {
    function getPossibleMoves(x, y) {
      let moves = [];
      if (x - 1 >= 0) moves.push({x: x - 1, y});
      if (y - 1 >= 0) moves.push({x, y: y - 1});
      if (x + 1 < dimension) moves.push({x: x + 1, y});
      if (y + 1 < dimension) moves.push({x, y: y + 1});
      return moves;
    }
    function shuffle() {
      const max = [4, 20, 100][level];
      const min = Math.floor(max / 2);
      let x = dimension - 1, y = dimension - 1, steps = Math.floor(Math.random() * (max - min) + min); // [min, max)
      for (; steps > 0; --steps) {
        const possibleMoves = getPossibleMoves(x, y);
        const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const tmp = tiles[x * dimension + y];
        tiles[x * dimension + y] = tiles[move.x * dimension + move.y];
        tiles[move.x * dimension + move.y] = tmp;
        x = move.x;
        y = move.y;
      }
    }
    const tiles = [];
    for (let x = 0; x < dimension; x++) {
      for (let y = 0; y < dimension; y++) {
        tiles.push(x * dimension + y + 1);
      }
    }
    shuffle();
    return tiles;
  },

  swap(tiles, i, j) {
    const newTiles = tiles.slice();
    let tmp = newTiles[i];
    newTiles[i] = newTiles[j];
    newTiles[j] = tmp;
    return newTiles;
  },
};

module.exports = Utils;
