function Game2048(board_str){
  this.board = board_str ? _.map(board_str.split(""), function(e) {return parseInt(e);}) : this.generateBoard();
  this.totalScore = 0;
}

Game2048.prototype.generateBoard = function(){
 var shuffledBoard = _.shuffle([2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
 return shuffledBoard;
}


Game2048.prototype.toString = function(){
  var str = ""
  for (i=0;i<3;i++) {
    str = str + this.board.slice(i*4, i*4+4).join("") + "\n"
  }
  return str + this.board.slice(12,16).join("")
}


Game2048.prototype.move = function(direction){
  var subArrays = [];
  var oldBoard = this.board;

  switch(direction){
    case 'left':
      for (var i=0;i<4;i++) {
        subArrays.push(this.board.slice(i*4, i*4+4));
      }
      this.checkBoardToLeft(subArrays);
      if(!compareArrays(oldBoard, this.board)){this.spawnNumber();}
      break;
    case 'right':
      for (var i=0;i<4;i++) {
        subArrays.push(this.board.slice(i*4, i*4+4));
      }
      this.checkBoardToRight(subArrays);
      if(!compareArrays(oldBoard, this.board)){this.spawnNumber();}
      break;
    case 'up':
      for (var i=0;i<4;i++) {
        subArrays.push(this.board.slice(i*4, i*4+4));
      }
      this.checkBoardToLeft(_.zip(subArrays[0],subArrays[1],subArrays[2],subArrays[3]));
      this.board = _.flatten(_.zip(this.board.slice(0,4),this.board.slice(4,8), this.board.slice(8,12),this.board.slice(12,16)));
      if(!compareArrays(oldBoard, this.board)){this.spawnNumber();}
      break;
    case 'down':
      for (var i=0;i<4;i++) {
        subArrays.push(this.board.slice(i*4, i*4+4));
      }
      this.checkBoardToRight(_.zip(subArrays[0],subArrays[1],subArrays[2],subArrays[3]));
      console.log(this.board);
      this.board = _.flatten(_.zip(this.board.slice(0,4),this.board.slice(4,8), this.board.slice(8,12),this.board.slice(12,16)));
      if(!compareArrays(oldBoard, this.board)){this.spawnNumber();}
      break;
  }

}

Game2048.prototype.checkBoardToLeft = function(subArrays){
  var updatedBoard = [];
  for(array in subArrays){
    var subArray = removeZeros(subArrays[array]);
    if(subArray.length < 2){
      combinedArr = subArray;
    }else{
      combinedArr = [];
      for(var sub_index=0; sub_index < subArray.length; sub_index++){
        if(subArray[sub_index] === subArray[sub_index+1]){
          combinedArr.push(subArray[sub_index] + subArray[sub_index+1]);
          sub_index++;
        }else{
          combinedArr.push(subArray[sub_index]);
        };
      };
      if(combinedArr.length === 0){combinedArr = subArray;};
    };
    updatedBoard.push(padWithZeros(combinedArr, 'left'));
  };
  this.board = _.flatten(updatedBoard);
}

Game2048.prototype.checkBoardToRight = function(subArrays){
  var updatedBoard = [];
  for(array in subArrays){
    var subArray = removeZeros(subArrays[array]);
    if(subArray.length < 2){
      combinedArr = subArray;
    }else{
      combinedArr = [];
      for(var sub_index = subArray.length-1; sub_index > -1; sub_index--){
        if(subArray[sub_index] === subArray[sub_index-1]){
          combinedArr.push(subArray[sub_index] + subArray[sub_index-1]);
          sub_index--;
        }else{
          combinedArr.push(subArray[sub_index]);
        };

      };

      if(combinedArr.length === 0){combinedArr = subArray;};
    };
    updatedBoard.push(padWithZeros(combinedArr.reverse(), 'right'));
  };
  this.board = _.flatten(updatedBoard);
}

var removeZeros = function(array) {
  var noZeroArr = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      noZeroArr.push(array[i]);
    };
  }
  return noZeroArr;
}


var padWithZeros = function(array, direction) {
  switch(direction){
    case 'left':
      return array.length === 4 ? array : array.concat(Array.apply(null, {length: 4-array.length}).map(function(){return 0}));
      break;
    case 'right':
      return array.length === 4 ? array : Array.apply(null, {length: 4-array.length}).map(function(){return 0}).concat(array);
      break;
  }

}


Game2048.prototype.spawnNumber = function(){
  // check if index matches 0, if not, keep generating new index till it matches 0
  while(_.contains(this.board, 0)) {
    var randIndex = Math.floor(Math.random()*16);
    if(this.board[randIndex] === 0){
      this.board[randIndex] = 2;
      break;
    };
  }
}

var compareArrays = function(a1, a2){
  for(var i=0; i<a1.length; i++){
    if(a1[i] !== a2[i]){
      return false;
    };
  };
  return true;
}


Game2048.prototype.getTotalScore = function(){
  this.totalScore = _.reduce(_.without(this.board, 0), function(memo, num){ return memo + num; }, 0);
  return this.totalScore
}
