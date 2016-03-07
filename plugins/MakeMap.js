/*global fwd*/
'use strict';

var ROT = require('node_modules/rot-js/lib/rot');
var blocks = require('blocks');

var Mapper = {
    map: {},
    engine: null,
    player: null,
    pedro: null,
    ananas: null,

    init: function init() {
        this._generateMap();
        return this;
    },

    _generateMap: function _generateMap() {
        var digger = new ROT.Map.Digger(100, 100);
        var freeCells = [];

        var digCallback = function digCallback(x, y, value) {
            if (value) {
                return;
            }

            var key = x + ',' + y;
            this.map[key] = '.';
            freeCells.push(key);
        };
        digger.create(digCallback.bind(this));
    },

    _createBeing: function _createBeing(What, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(',');
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        return new What(x, y);
    },

    _generateBoxes: function _generateBoxes(freeCells) {
        for (var i = 0; i < 10; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            this.map[key] = '*';
            if (!i) {
                this.ananas = key;
            } /* first box contains an ananas */
        }
    }
};
var _drawMap = function _drawMap(map) {
    var _z = 0;
    var ref = box(blocks.stone, 100, 2, 100);
    ref = ref.move('start');
    var _x = 0;
    echo(Object.keys(map).length);
    Object.keys(map).forEach(function (key) {
      var [x, y] = key.split(',');
      x = parseInt(x, 10);
      y = parseInt(y, 10);
      ref = ref.fwd(x);
      ref = ref.right(y);
      ref.box(blocks.air);
      ref = ref.up()
      ref.box(blocks.air);
      ref = ref.move('start');
    });
    echo("Done building");
};

function mapper() {
    Mapper.init();
    _drawMap(Mapper.map);
}

exports.mapper = mapper;
