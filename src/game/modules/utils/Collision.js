namespace`game.modules.utils`(
    class Collision {
        constructor(map) {
            this.map = map;
        /**
        *
        * @param {Collision} map Array with vectors forming the collision map. Example:
        *  [
        *        {
        *           "start": [0, 0],
        *            "end": [1, 2]
        *        },
        *        {
        *            "start": [1, 2],
        *            "end": [3, 2]
        *        },
        *        {
        *            "start": [3, 2],
        *            "end": [4, 0]
        *        }
        *    ]. 
        * This array would form the following collision map: https://cdn.discordapp.com/attachments/773510555578662922/777259379111755816/unknown.png 
        */
        }
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