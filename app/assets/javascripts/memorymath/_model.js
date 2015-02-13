function MemoryMathModel(){
  this.board_seq = [];
  this.score = 0;
  this.outOf = 0;
};

MemoryMathModel.prototype.createBoardSeq = function(){
  array = Array.apply(null, { length: 12 }).map(function(element, index) { return index+1; });
  array = array.concat(['+', '-', '*', "/"]);
  shuffledArray = [];
  while(array.length>0){
    shuffledArray.push((array.splice(Math.floor(Math.random() * array.length) ,1))[0]);
  };
  return shuffledArray;
};

MemoryMathModel.prototype.question = function(){
  operations = ['+', '-', '*', "/"];
  array = Array.apply(null, { length: 12 }).map(function(element, index) { return index+1; });
  n1 = Math.floor(Math.random() * 12) + 1;
  n2 = Math.floor(Math.random() * 12) + 1;
  operation = operations[Math.floor(Math.random() * 4)];
  switch(operation) {
    case '+':
        number = n1 + n2;
        break;
    case '-':
        number = n1 - n2;
        break;
    case '*':
        number = n1 * n2;
        break;
    case '/':
        number = Math.round(n1 / n2);
        break;
  };
  this.outOf += 1;
  return number;
};


MemoryMathModel.prototype.result = function(question, array){
  var self = this;
  switch(self.board_seq[array[1]]) {
    case '+':
        number = self.board_seq[array[0]] + self.board_seq[array[2]];
        break;
    case '-':
        number = self.board_seq[array[0]] - self.board_seq[array[2]];
        break;
    case '*':
        number = self.board_seq[array[0]] * self.board_seq[array[2]];
        break;
    case '/':
        number = Math.round(self.board_seq[array[0]] / self.board_seq[array[2]]);
        break;
  };
  if(question === number){this.score +=1;};
  return question === number;

};

MemoryMathModel.prototype.setNewBoard = function(){
  this.board_seq = this.createBoardSeq();
  this.board_seq.forEach(function(element, index){
    $('span', '#'+index).text(element);
  });
};