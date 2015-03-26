$(document).ready(function() {
  game = new Game();
  updateBoard();

  Mousetrap.bind('left', function() {
    game.move('left');
    updateBoard();
  }, 'keyup');

  Mousetrap.bind('up', function() {
    game.move('up');
    updateBoard();
  }, 'keyup');

  Mousetrap.bind('down', function() {
    game.move('down');
    updateBoard();
  }, 'keyup');

  Mousetrap.bind('right', function() {
    game.move('right');
    updateBoard();
  }, 'keyup');
});

var updateBoard = function() {
  $('#score').text("Total Score: " + game.totalScore())
  $.each($('.number'), function(index, number) {
    if(game.board[index] === 0) {
      number.innerHTML = "";
    } else {
      number.innerHTML=game.board[index];
    };
  })
};
