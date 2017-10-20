/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //make a new board using n
  //iterate over board's rows
  //iterate over each row's each item
  //toggle the first index/column 
  //on each iteration check for rockConflict
  //if there isn't any, toggle the index value
  //if there is a conflict, toggle that index back to 0
  //toggle the next one and check for rookConflict
  //...
  
  var board = new Board({'n': n});
  var rows = board.rows();
  
  for (var i = 0; i < rows.length; i++) {
    var currentRow = rows[i];
    for (var j = 0; j < rows[i].length; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      } 
    }  
  }
  var solution = rows; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //make a new board
  //declare a counter (that'll keep track of correct board)
  //declare an counter (that'll keep track of the number of rooks that are being placed on the board)
  //iterate over the length of first row of the baord
  //try starting new board on each indices of the first array
  //
  var solutionCount = 0;
  if (n === 1) {
    solutionCount = 1;
    return solutionCount;
  } 

  for (var i = 0; i < n; i++) {
    var board = new Board({'n': n});
    var rows = board.rows();
    board.togglePiece(0, i);
    findNextSpace(1);
  }

    function findNextSpace(rowIndex) {
      var currentRow = rows[0];
      for (var j = 0; j < currentRow.length; j++) {
        board.togglePiece(rowIndex, j);
          if(!board.hasAnyRooksConflicts()) {
            if (rowIndex < currentRow.length - 1) {
              findNextSpace(rowIndex + 1, 0);          
            } else {
              solutionCount++;
            }
          } else {
            board.togglePiece(rowIndex, j);
          }


      
     }
    }  
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n});
  var rows = board.rows();
  
  for (var i = 0; i < rows.length; i++) {
    var currentRow = rows[i];
    for (var j = 0; j < rows[i].length; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(i, j);
      } 
    }  
  }
  var solution = rows; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
