var game = {
  num_cols: 4,
  num_rows: 4,
  tiles: [],
  isClicked: -1,
  clickedTile: {},
  randomArray: [],
  colors: ["#6B81A5", "#7c7678", "#7a9177", "#b4a8bf", "#d15353", "#8e6666",
    "#aaa09e", "#efd483"
  ],
  initialize: function() {
    for (var i = 0; i < this.num_cols; i++) {
      this.tiles[i] = [];
      for (var j = 0; j < this.num_rows; j++) {
        this.tiles[i].push(-1);
        this.randomArray.push(i * this.num_cols + j);
      }
    }
    console.log(this.tiles);
  },
  showColor: function(tile) {
    tile.style.backgroundColor = tile.dataset.color;
    if (this.isClicked === 0) {
      this.isClicked = 1;
      if (tile.dataset.color === clickedTile.dataset.color) {
        console.log(tile.dataset.color + " = " + clickedTile.dataset.color);
        console.log("Awesome");
        tile.style.backgroundColor = "red";
        clickedTile.style.backgroundColor = "red";
      } else {
        window.setTimeout(function() {
          tile.style.backgroundColor = "transparent";
          clickedTile.style.backgroundColor = "transparent";
        }, 1000);

      }
      console.log(tile.dataset.color);
    } else if (this.isClicked === -1) {
      this.isClicked = 0;
      clickedTile = tile;
      console.log(tile.dataset.color);
    } else {
      this.isClicked = -1;
    }
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
  },
  // bookAtile: function(col, row, seat) {
  //   this.tiles[col][row] = (this.tiles[col][row] + 1) % 2;
  //   if (seat.dataset.status === '0') {
  //     seat.dataset.status = '1';
  //   } else {
  //     seat.dataset.status = '0';
  //   }
  // }
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
