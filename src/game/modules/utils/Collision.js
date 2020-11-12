namespace`game.modules.utils`(
    class Collision {
        constructor(map) {
            this.map = map;
        }
        // map: [
        //      start: [x, y]
        //      end: [x, y]
        //      ]

        // example: 
        // "map": [
        //     {
        //         "start": [0, 0],
        //         "end": [1, 2]
        //     },
        //     {
        //         "start": [1, 2],
        //         "end": [3, 2]
        //     },
        //     {
        //         "start": [3, 2],
        //         "end": [4, 0]
        //     }
        // ]
        //
        // x: 0.584
        // y: 1.168
// loops throu all vectors, 
// checks player is in range of vector - hopefully makes better performance, but seems like a no: https://jsben.ch/GAXFF
// checks if player is on vector
        check(x, y) {
            for (let i = 0; i < this.map.length; i++) {
                if (x >= this.map[i].start[0] && y >= this.map[i].start[1] && x <= this.map[i].end[0] && y <= this.map[i].end[1]) {
                    if (x / (this.map[i].end[0]) - this.map[i].start[0] == y / (this.map[i].end[1]) - this.map[i].start[1]) return true;
                }
            }
            return false;
        }
    }
);