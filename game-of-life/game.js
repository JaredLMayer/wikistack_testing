var gameOfLife = {
  width: 12,
  height: 12,
  stepInterval: null,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    for(var i = 0 ; i < this.width; i++)
      for(var j = 0 ; j < this.height; j++)
        iteratorFunc.call(this, document.getElementById(i + '-' + j));
  },
  
  setupBoardEvents: function() {
    
    var onCellClick = function (e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      
      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };
    
    this.forEachCell(function(cell){
      cell.onclick = onCellClick;
    });

    document.getElementById('step_btn').onclick = this.step.bind(this);
    document.getElementById('clear_btn').onclick = this.clear.bind(this);
    document.getElementById('reset_btn').onclick = this.resetRandom.bind(this);
    document.getElementById('play_btn').onclick = this.play.bind(this);
  },
  play : function(){
    var that = this;
    window.setInterval(function(){
      that.step();
    }, 500);
  
  },
  clear : function(){
    this.forEachCell(function(cell){
      cell.className = 'dead';
      cell.setAttribute('data-status', 'dead');
    });
  },
  resetRandom : function(){
    var states = ['dead', 'alive'];

    this.forEachCell(function(cell){
      var state = states[Math.floor(Math.random()*2)];
      cell.className = state;
      cell.setAttribute('data-status', state);
    });
  },
  _isAlive : function(cell){
    return cell.className === 'alive';
  },
  _nearestNeighbors : function(cell){
    var parts = cell.id.split('-');
    var x = parts[0]*1;
    var y = parts[1]*1;
    var neighbors = [];
    for(var i = x - 1; i <= x + 1; i++)
      for(var j = y - 1; j <= y + 1; j++){
        _cell = document.getElementById(i + '-' + j);
        if(_cell && _cell !== cell)
          neighbors.push(_cell);
      }
    return neighbors;
  },
  _nearestAliveNeighbors : function(cell){
    var count = 0;
    var neighbors = this._nearestNeighbors(cell); 
    for(var i = 0; i < neighbors.length; i++)
      if(this._isAlive(neighbors[i]))
        count++;

    return count;
  },
  _nextStatus : function(cell){
    var aliveNeighbors = this._nearestAliveNeighbors(cell);
    var living = this._isAlive(cell);
    if(living){
      return aliveNeighbors === 2 || aliveNeighbors === 3 ? 'alive' : 'dead';
    }
    else
      return aliveNeighbors === 3 ? 'alive' : 'dead';
  },
  step: function () {
    this.forEachCell(function(cell){
      cell.setAttribute('data-status', this._nextStatus(cell));
    });
    this.forEachCell(function(cell){
      cell.className = cell.getAttribute('data-status');
    });
    
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    
  }
};

  gameOfLife.createAndShowBoard();
