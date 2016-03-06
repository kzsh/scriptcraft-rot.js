/*global box, move, echo */
var ROT = require('node_modules/rot-js/lib/rot');
var blocks = require('blocks');

var Mapper = {
    map: {},
    engine: null,
    player: null,
    pedro: null,
    ananas: null,

    init: function() {
        this._generateMap();
        return this;
    },

    _generateMap: function() {
        var digger = new ROT.Map.Digger(100, 100);
        var freeCells = [];

        var digCallback = function(x, y, value) {
            if (value) { return; }

            var key = x+','+y;
            this.map[key] = '.';
            freeCells.push(key);
        };
        digger.create(digCallback.bind(this));

        //this._generateBoxes(freeCells);
        this._drawWholeMap();

    },

    _createBeing: function(What, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(',');
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        return new What(x, y);
    },

    _generateBoxes: function(freeCells) {
        for (var i=0;i<10;i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            this.map[key] = '*';
            if (!i) { this.ananas = key; } /* first box contains an ananas */
        }
    },

    _drawWholeMap: function() {
      //console.log(this.map);
        //for (var key in this.map) {
            //var parts = key.split(',');
            //var x = parseInt(parts[0]);
            //var y = parseInt(parts[1]);
            //this.display.draw(x, y, this.map[key]);
        //}
    }
};
var _drawMap = function (map) {
  var _z = 0;
  var ref = box(blocks.stone, 100, 3, 100);
  ref = ref.move('start');
  while (_z < 2) {
    var _x = 0;
    while(_x < 100) {
      ref = ref.chkpt('row'+ _x);
      var _y = 0;
      while(_y < 100) {
        ref = ref.fwd();
        var mapValue = map[`${_x},${_y}`];
        //echo(`${_x},${_y}`)
        if(mapValue) {
          ref.box(blocks.air);
        }
        _y++;
      }
      ref = move('row'+_x).box(blocks.gold).right();
      _x++;
    }
    ref = ref.move('start').up();
    _z++;
  }
  echo('Done building');
};

function foobar() {
  Mapper.init();
  _drawMap(Mapper.map);
}

exports.mapper = foobar;
