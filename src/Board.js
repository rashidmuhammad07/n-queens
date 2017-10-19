// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //Find the row we're on using rowIndex
      var rows = this.rows();
      var currentRow = rows[rowIndex];
      //Check if row has > 1, '1'
      var counter = 0;
      for (var i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 1) {
          counter++;
        }
      }

      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Check all rows
      var rows = this.rows();
      for (var i = 0; i < rows.length; i ++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //Check colIndex for each row
      //Iterate through each row
      //declare column array that will host each array's value at colIndex
      var row = this.rows();
      var columnArr = [];
      for (var i = 0; i < row.length; i++) {
        var currentRow = row[i];
        columnArr.push(currentRow[colIndex]);
      }
      //declare counter variable
      //iterate through columnArr
      //compare each item against 1 to find occurances of value '1'
      //increment counter each time we find repeatition of value '1'
      //check if the value of counter is greater than 1
      //if yes, return true
      //otherwise false
      var counter = 0;
      for (var j = 0; j < columnArr.length; j++) {
        if (columnArr[j] === 1) {
          counter++;
        }
      }
      
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //store all the rows in a variable called 'rows'
      //store first array from 'rows' in a variable called firstRow
      //loop through firstRow
      //pass the index of firstRow to 'hasColConflictAt' function
      //return bolean accordingly
     
      var rows = this.rows();
      var firstRow = rows[0];
      for (var i = 0; i < firstRow.length; i ++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var input = majorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      if (input < 0) {
        var rowIndex = Math.abs(input);
        var columnIndex = 0;
      }

      if (input > 0) {
        rowIndex = 0;
        columnIndex = input;
      }

      if (input === 0) {
        rowIndex = 0;
        columnIndex = 0;
      }
      
      var diagonalArr = [];
      while (rowIndex < rows.length && columnIndex < rows.length) {
        diagonalArr.push(rows[rowIndex][columnIndex]);
        columnIndex++;
        rowIndex++;
      }
      
      var counter = 0;
      for (var i = 0; i < diagonalArr.length; i++) {
        if (diagonalArr[i] === 1) {
          counter++;
        }
      }
      
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var length = this.rows()[0].length - 1;
      var start = length * -1;
      for (var i = start; i < length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var reversedRows = [];
      for (var i = 0; i < rows.length; i++) {
        reversedRows.push(rows[i].reverse());
      }
      
      var input = minorDiagonalColumnIndexAtFirstRow;
      if (input < 0) {
        var rowIndex = Math.abs(input);
        var columnIndex = 0;
      }

      if (input > 0) {
        rowIndex = 0;
        columnIndex = input;
      }

      if (input === 0) {
        rowIndex = 0;
        columnIndex = 0;
      }
      
      var diagonalArr = [];
      while (rowIndex < reversedRows.length && columnIndex < reversedRows.length) {
        diagonalArr.push(reversedRows[rowIndex][columnIndex]);
        columnIndex++;
        rowIndex++;
      }
      
      var counter = 0;
      for (var i = 0; i < diagonalArr.length; i++) {
        if (diagonalArr[i] === 1) {
          counter++;
        }
      }
      
      if (counter > 1) {
        return true;
      }
      return false;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var length = this.rows()[0].length - 1;
      var start = length * -1;
      for (var i = start; i < length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
