var game = {
  num_cols: 4,
  num_rows: 4,
  num_matches_to_win: 2,
  score: 0,
  numOfClicks: 0,
  clickedTiles: [],
  matchedTiles: [],
  randomColorArray: [],
  colors: ["#D470DB", "#B2DD78", "#F5E2D6", "#61ABAC", "#5B75B9",
    "#CDF0C1", "#36CEA3", "#DA7167", "#6B81A5", "#7c7678", "#b4a8bf",
    "#d15353", "#8e6666", "#aaa09e", "#efd483", "#23378B", "#6A28A4"
  ],
  initialize: function() {
    for (var i = 0; i < this.num_cols; i++) {
      for (var j = 0; j < this.num_rows; j++) {
        this.randomColorArray.push(i * this.num_cols + j);
      }
    }
  },
  makeColorVisible: function(tile) {
    tile.setAttribute("bgcolor", this.randomColorArray[tile.dataset.colorIndex]);
    game.clickedTiles.push(tile);
  },
  makeTransparentAll: function() {
    game.clickedTiles.forEach(function(value, index) {
      value.setAttribute("class", "tile");
      value.setAttribute("bgcolor", "transparent");
    });
    game.clickedTiles.splice(0, game.clickedTiles.length);
  },
  markAsCompleted: function() {
    game.clickedTiles.forEach(function(value, index) {
      value.setAttribute("class",
        "tile glyphicon glyphicon-ok matched-tile");
      value.setAttribute("bgcolor", "transparent");
    });
    game.clickedTiles.splice(0, game.clickedTiles.length);
  },
  shakeTheTileBox: function() {
    document.getElementById("tiles-box").setAttribute("class",
      "unmatched-tile");
    setTimeout(function() {
      document.getElementById("tiles-box").removeAttribute("class");
    }, 1000);
  },
  showColor: function(tile) {
    if (this.clickedTiles.indexOf(tile) !== -1) {
      return;
    }
    this.numOfClicks++;
    if (this.clickedTiles.length < this.num_matches_to_win - 1) {
      this.makeColorVisible(tile);
      this.score -= 10;
    } else if (this.clickedTiles.length === this.num_matches_to_win - 1) {
      this.makeColorVisible(tile);
      var bgColor = this.randomColorArray[this.clickedTiles[0].dataset.colorIndex];
      this.clickedTiles.forEach(function(value, index) {
        if (game.randomColorArray[value.dataset.colorIndex] !==
          bgColor) {
          game.score -= 10;
          setTimeout(game.shakeTheTileBox, 200);
          this.hidelements = setTimeout(game.makeTransparentAll, 500);
        } else if (index === game.clickedTiles.length - 1) {
          this.matchlements = setTimeout(game.markAsCompleted, 300);
          game.score += 50;
        }
      });
      //do the else part here
    } else {
      window.clearTimeout(hidelements);
      this.makeTransparentAll();
      this.makeColorVisible(tile);
      //dead zone
    }
    document.getElementById('score').innerHTML = "Your score = " + game.score;
    document.getElementById('num-clicks').innerHTML = "Number of moves = " +
      game.numOfClicks;
  },
  randomiseColorArray: function() {
    var self = this;
    var i = self.randomColorArray.length;
    var tempArray = [];
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      tempArray.push(self.randomColorArray[j]);
      self.randomColorArray.splice(j, 1);
    }
    self.randomColorArray = tempArray.slice(0);
  },
  populaterandomColorArray: function() {
    var self = this;
    console.log(self.randomColorArray);
    self.randomColorArray.forEach(function(value, index) {
      self.randomColorArray[index] = self.colors[Math.floor(value / 2)];
    });
    console.log(self.randomColorArray);
  }
};

game.initialize();

window.onload = function() {
  game.randomiseColorArray();
  var table = document.getElementById('tiles-box');
  for (var i = 0; i < game.num_rows; i++) {
    for (var j = 0; j < game.num_cols; j++) {
      var tile = document.createElement('div');
      tile.setAttribute("class", "tile testpoly1");
      tile.dataset.colorIndex = game.randomColorArray[i * game.num_rows + j];
      tile.setAttribute("bgcolor", "transparent");
      tile.addEventListener("click", function() {
        game.showColor(this);
      });
      table.appendChild(tile);
    }
  }
  game.populaterandomColorArray();
  document.getElementById('score').innerHTML += game.score;
  document.getElementById('num-clicks').innerHTML += game.numOfClicks;
  polyfilfn(window);
  polyfilfn2();
};
