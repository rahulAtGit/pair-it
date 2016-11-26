var game = {
  num_cols: 4,
  num_rows: 4,
  isClicked: -1,
  firstClickedTile: {},
  secondClickedTile: {},
  randomArray: [],
  colors: ["#6B81A5", "#7c7678", "#7a9177", "#b4a8bf", "#d15353", "#8e6666",
    "#aaa09e", "#efd483"
  ],
  initialize: function() {
    for (var i = 0; i < this.num_cols; i++) {
      for (var j = 0; j < this.num_rows; j++) {
        this.randomArray.push(i * this.num_cols + j);
      }
    }
  },
  hideTileColor: function(isClicked) {
    this.secondClickedTile.style.backgroundColor = "transparent";
    this.firstClickedTile.style.backgroundColor = "transparent";
    this.isClicked = isClicked;
    this.firstClickedTile = this.secondClickedTile = {};
  },
  matchedTileColor: function(isClicked) {
    this.secondClickedTile.style.backgroundColor = "red";
    this.firstClickedTile.style.backgroundColor = "red";
    this.isClicked = isClicked;
  },
  showColor: function(tile) {
    if (this.firstClickedTile === tile || tile.style.backgroundColor ===
      "red") {
      return;
    }
    if (this.isClicked === 0) {
      this.secondClickedTile = tile;
      this.isClicked = 1;
      if (tile.dataset.color === this.firstClickedTile.dataset.color) {
        matchTimeout = window.setTimeout(this.matchedTileColor.bind(this, -
            1),
          300);
      } else {
        hideTimeout = window.setTimeout(this.hideTileColor.bind(this, -1),
          1000);

      }
    } else if (this.isClicked === -1) {
      this.isClicked = 0;
      this.firstClickedTile = tile;
      console.log(tile.dataset.color);
    } else if (this.isClicked === 1) {
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
        this.hideTileColor.call(this, 0); //.call(this, tile, firstClickedTile);
        this.firstClickedTile = tile;
      }
    }
    tile.style.backgroundColor = tile.dataset.color;
  },
  populateRandomArray: function() {
    var rand;
    var self = this;
    var i = self.randomArray.length;
    var tempArray = [];
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      tempArray.push(self.randomArray[j]);
      self.randomArray.splice(j, 1);
    }
    self.randomArray = tempArray.slice(0);
    console.log(self.randomArray);
    self.randomArray.forEach(function(value, index) {
      self.randomArray[index] = self.colors[Math.floor(value / 2)];
    });
    console.log(self.randomArray);
  }
};

var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

game.initialize();

window.onload = function() {
  game.populateRandomArray();
  var table = document.getElementById('tiles-box');
  for (var i = 0; i < game.num_rows; i++) {
    for (var j = 0; j < game.num_cols; j++) {
      var tile = document.createElement('div');
      tile.className = "tile";
      tile.dataset.color = game.randomArray[i * game.num_rows + j];
      tile.addEventListener("click", function() {
        game.showColor(this);
      });
      table.appendChild(tile);
    }
  }
};
