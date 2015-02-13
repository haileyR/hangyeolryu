MemoryMathView = function(opts){
  this.boardId = opts.boardId;
  this.questionId = opts.questionId;
  this.questionElement = $('p',opts.questionId)[0];
  this.equationElement = $('p',opts.questionId)[1];
  this.hintButtonId = opts.hintButtonId;
  this.newGameButtonId = opts.newGameButtonId;
  this.scoreId = opts.scoreId;
}

MemoryMathView.prototype.clean = function(){
  $(this.scoreId).text('');
  $(this.questionElement).text('');
  $(this.equationElement).text('');
}

MemoryMathView.prototype.setQuestion = function(question){
  $(this.equationElement).text('');
  this.questionElement.innerHTML = question+" = ";
}

MemoryMathView.prototype.updateScore = function(score, outOf){
  $(this.scoreId).text('Score: '+score+'/'+outOf);
}

MemoryMathView.prototype.hideBoardContents = function(milisec){
  setTimeout(function(){ $("span", this.boardId).fadeOut(); }, milisec);
}
