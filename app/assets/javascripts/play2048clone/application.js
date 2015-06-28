$(document).ready(function() {
  $('#start-2048').on('click', function(event){
    set2048();
  });
});

var set2048 = function() {
  var game = new Game2048();
  updateBoard(game);

  Mousetrap.bind('left', function() {
    game.move('left');
    updateBoard(game);
  }, 'keyup');

  Mousetrap.bind('up', function() {
    game.move('up');
    updateBoard(game);
  }, 'keyup');

  Mousetrap.bind('down', function() {
    game.move('down');
    updateBoard(game);
  }, 'keyup');

  Mousetrap.bind('right', function() {
    game.move('right');
    updateBoard(game);
  }, 'keyup');
}

var updateBoard = function(game) {
  $('#score').text("Score: " + game.totalScore)
  $.each($('.number'), function(index, number) {
    if(game.board[index] === 0) {
      number.innerHTML = "";
    } else {
      number.innerHTML = game.board[index];
    };
  })
};
