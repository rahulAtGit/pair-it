var game = {
  num_cols: 4,
  num_rows: 4,
  isClicked: -1,
  firstClickedTile: {},
  secondClickedTile: {},
  randomArray: [],
  colors: ["#D470DB", "#B2DD78", "#F5E2D6", "#61ABAC", "#5B75B9",
    "#CDF0C1", "#36CEA3", "#DA7167", "#6B81A5", "#7c7678", "#b4a8bf",
    "#d15353", "#8e6666", "#aaa09e", "#efd483", "#23378B", "#6A28A4"
  ],
  initialize: function() {
    for (var i = 0; i < this.num_cols; i++) {
      for (var j = 0; j < this.num_rows; j++) {
        this.randomArray.push(i * this.num_cols + j);
      }
    }
  },
  score: 0,
  numOfClicks: 0,
  hideTileColor: function(isClicked) {
    this.secondClickedTile.style.backgroundColor = "transparent";
    this.firstClickedTile.style.backgroundColor = "transparent";
    this.isClicked = isClicked;
    this.firstClickedTile = this.secondClickedTile = {};
  },
  matchedTileColor: function(isClicked) {
    this.secondClickedTile.style.backgroundColor = "transparent";
    this.firstClickedTile.style.backgroundColor = "transparent";
    this.secondClickedTile.setAttribute("class",
      "tile glyphicon glyphicon-ok matched-tile");
    this.firstClickedTile.setAttribute("class",
      "tile glyphicon glyphicon-ok matched-tile");
    this.secondClickedTile.setAttribute("is-matched",
      true);
    this.firstClickedTile.setAttribute("is-matched",
      true);
    this.isClicked = isClicked;
  },
  showColor: function(tile) {
    this.numOfClicks++;
    if (this.firstClickedTile === tile || tile.hasAttribute("is-matched")) {
      return;
    }
    if (this.isClicked === 0) {
      this.secondClickedTile = tile;
      this.isClicked = 1;
      if (tile.dataset.color === this.firstClickedTile.dataset.color) {
        this.score += 50;
        matchTimeout = window.setTimeout(this.matchedTileColor.bind(this, -
            1),
          300);
      } else {
        this.score -= 10;
        hideTimeout = window.setTimeout(this.hideTileColor.bind(this, -1),
          1000);

      }
    } else if (this.isClicked === -1) {
      this.score -= 10;
      this.isClicked = 0;
      this.firstClickedTile = tile;
      console.log(tile.dataset.color);
    } else if (this.isClicked === 1) {
      if (hideTimeout) {
        this.score -= 10;
        window.clearTimeout(hideTimeout);
        this.hideTileColor.call(this, 0); //.call(this, tile, firstClickedTile);
        this.firstClickedTile = tile;
      }
    }
    tile.style.backgroundColor = tile.dataset.color;
    document.getElementById('score').innerHTML = "Your score = " + game.score;
    document.getElementById('num-clicks').innerHTML = "Number of moves = " +
      game.numOfClicks;
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
  document.getElementById('score').innerHTML += game.score;
  document.getElementById('num-clicks').innerHTML += game.numOfClicks;
};
