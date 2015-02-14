MemoryMathController = function(model, view){
  this.model = model
  this.view = view
  this._bindEventListener()
  this.timeouts = []

  this.clickCount = 0;
  this.clickedTds = [];
}

MemoryMathController.prototype.resetForNewQuestion = function(){
  this.view.hideBoardContents(100);
  this.view.updateScore(this.model.score, this.model.outOf);
  this.view.setQuestion(this.model.question());
  this.clickCount = 0;
  this.clickedTds = [];
}

MemoryMathController.prototype._bindEventListener = function(event){
  var self = this;
  $(this.view.newGameButtonId).on('click', function(){
    for (var i = 0; i < self.timeouts.length; i++) {
        clearTimeout(self.timeouts[i]);
    }
    self.timeouts = [];
    self.view.clean();
    self.model.setNewBoard();
    $("span", self.view.boardId).fadeIn();
    window.hintsVisible = true;
    self.timeouts.push(setTimeout(function(){
      $("span", self.view.boardId).fadeOut();
    }, 5000));
    self.timeouts.push(setTimeout(function(){
      self.view.setQuestion(self.model.question());
      window.hintsVisible = false;
    }, 5500));
  })

  $(this.view.boardId).on('click', 'td', function(event){
    if(window.hintsVisible){
      return;
    };
    $(event.target.firstChild).show();
    self.clickCount+=1;
    self.view.equationElement.innerHTML = self.view.equationElement.innerHTML+' '+self.model.board_seq[this.id];
    self.clickedTds.push(this.id);
    if(self.clickCount===1 || self.clickCount===3){
      if(typeof self.model.board_seq[this.id] === 'string'){
        $('.fa-times').fadeIn();
        self.timeouts.push(setTimeout(function(){
          $('.fa-times').fadeOut();
        }, 1000));
        self.resetForNewQuestion();
      }else if(self.clickCount===3){
        if(self.model.result(parseInt($('#question')[0].textContent), self.clickedTds)){
          $('.fa-check').fadeIn();
          self.timeouts.push(setTimeout(function(){
            $('.fa-check').fadeOut();
          }, 1000));
          self.resetForNewQuestion();
        }else{
          $('.fa-times').fadeIn();
          self.timeouts.push(setTimeout(function(){
            $('.fa-times').fadeOut();
          }, 1000));
          self.resetForNewQuestion();
        };
      };
    }else if(self.clickCount===2){
      if(typeof self.model.board_seq[this.id] === 'number'){
        $('.fa-times').fadeIn();
        self.timeouts.push(setTimeout(function(){
          $('.fa-times').fadeOut();
        }, 1000));
        self.resetForNewQuestion();
      };
    };

  });

  $(this.view.hintButtonId).on('click', function(){
    if(window.hintsVisible){
      return;
    };
    $("span", self.view.boardId).show();
    window.hintsVisible = true;
    self.model.score -= 2;
    setTimeout(function(){
      self.view.hideBoardContents();
      window.hintsVisible = false;
    }, 2000);
    self.view.updateScore(self.model.score, self.model.outOf-1);
  });
}

MemoryMath = function(opts){
  new MemoryMathController(
    new MemoryMathModel(),
    new MemoryMathView(opts)
    )
}

MemoryMath({
 boardId: '#board',
 questionId: '#numberToMake',
 hintButtonId: '#hint',
 newGameButtonId: '#newgame',
 scoreId: '#score'
});