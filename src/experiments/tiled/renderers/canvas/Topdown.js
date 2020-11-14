namespace `experiments.tiled.renderers.canvas` (
    class Topdown {
        constructor(context, map, camera){
            this.context=context;
            this.ctx=context;
            this.map=map;
            this.camera = camera;
            this.tileAtlas = new Image();
            this.tileAtlas.src="resources/maps/topdown/atlas_16x.png";

            // document.body.appendChild(this.tileAtlas)
        }

        onDraw(){
            this.drawLayer(0);
            // this.drawGrid();
        }

        drawLayer (layer) {
            var map=this.map;
            var startCol = Math.floor(this.camera.x / map.tilewidth);
            var endCol = startCol + (this.camera.width / map.tilewidth);
            var startRow = Math.floor(this.camera.y / map.tileheight);
            var endRow = startRow + (this.camera.height / map.tileheight);
            var offsetX = -this.camera.x + startCol * map.tilewidth;
            var offsetY = -this.camera.y + startRow * map.tileheight;

            for (var c = startCol; c <= endCol; c++) {
                for (var r = startRow; r <= endRow; r++) {
                    // debugger;
                    var tile = map.getTile(layer, c, r);
                    var x = (c - startCol) * map.tilewidth + offsetX;
                    var y = (r - startRow) * map.tileheight + offsetY;
                    debugger;
                    // if (tile !== 0) { // 0 => empty tile
                        this.context.drawImage(
                            this.tileAtlas, // image
                            c * map.tilewidth, // source x
                            r * map.tileheight, // source y
                            map.tilewidth, // source width
                            map.tileheight, // source height
                            Math.round(x),  // target x
                            Math.round(y), // target y
                            map.tilewidth, // target width
                            map.tileheight // target height
                        );
                    // }
                }
            }
        }


        drawGrid () {
            var map=this.map;
            var width = map.width * map.tilewidth;
            var height = map.height * map.tileheight;
            var x, y;
            for (var r = 0; r < map.height; r++) {
                x = - this.camera.x;
                y = r * map.tileheight - this.camera.y;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(width, y);
                this.ctx.stroke();
            }
            for (var c = 0; c < map.width; c++) {
                x = c * map.tilewidth - this.camera.x;
                y = - this.camera.y;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x, height);
                this.ctx.stroke();
            }
        }
    }
)