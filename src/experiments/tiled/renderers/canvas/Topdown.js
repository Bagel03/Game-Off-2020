namespace `experiments.tiled.renderers.canvas` (
    class Topdown {
        constructor(context,map){
            this.context=document.createElement('canvas').getContext('2d');
            this.map=map;
            this.context.canvas.width = 500;
            this.context.canvas.height = 500;
            this.tileAtlas = new Image();
            this.tileAtlas.src="./resources/maps/topdown/atlas_16x.png";
            this.tileAtlas.addEventListener('load', () => this.onDraw)
            // document.body.appendChild(this.tileAtlas)
            console.log(this.context)
        }

        onDraw(){
            for(let i = 0; i < this.map.layers.length; i++){
                this.drawLayer(i);
            }
            // this.drawGrid();
        }

        drawLayer (layer) {
            const {map, context} = this;
            for(let row = 0; row < map.width; row++){
                for(let col = 0; col < map.width; col++){
                    const tile = map.getTile(layer, col, row);
                    // if(tile === 0) continue;
                    var tileset = layer === 0 ?
                    map.getTilesetByIndex(layer):
                    map.getTilesetForLayerByMaterialSource(map.layers[layer]);
                    var tilepos = map.getTilePositionFor(tileset, tile, layer);//returns {col,row,x,y}
                    context.drawImage(
                        this.tileAtlas, 
                        tilepos.x, 
                        tilepos.y, 
                        map.tilewidth,
                        map.tileheight,
                        col * map.tilewidth,
                        row * map.tileheight,
                        map.tilewidth,
                        map.tileheight
                    )
                }
            }
            // var map=this.map;
            // var startCol = Math.floor(this.camera.x / map.tilewidth);
            // var endCol = startCol + (this.camera.width / map.tilewidth);
            // var startRow = Math.floor(this.camera.y / map.tileheight);
            // var endRow = startRow + (this.camera.height / map.tileheight);
            // var offsetX = -this.camera.x + startCol * map.tilewidth;
            // var offsetY = -this.camera.y + startRow * map.tileheight;

            // for (var c = startCol; c <= endCol; c++) {
            //     for (var r = startRow; r <= endRow; r++) {
            //         // debugger;
            //         var tile = map.getTile(layer, c, r);
            //         var x = (c - startCol) * map.tilewidth + offsetX;
            //         var y = (r - startRow) * map.tileheight + offsetY;
            //         debugger;
            //         // if (tile !== 0) { // 0 => empty tile
            //             this.context.drawImage(
            //                 this.tileAtlas, // image
            //                 c * map.tilewidth, // source x
            //                 r * map.tileheight, // source y
            //                 map.tilewidth, // source width
            //                 map.tileheight, // source height
            //                 Math.round(x),  // target x
            //                 Math.round(y), // target y
            //                 map.tilewidth, // target width
            //                 map.tileheight // target height
            //             );
            //         // }
            //     }
            // }
        }


        drawGrid () {
            var map=this.map;
            var width = map.width * map.tilewidth;
            var height = map.height * map.tileheight;
            var x, y;
            for (var r = 0; r < map.height; r++) {
                x = - this.camera.x;
                y = r * map.tileheight - this.camera.y;
                this.context.beginPath();
                this.context.moveTo(x, y);
                this.context.lineTo(width, y);
                this.context.stroke();
            }
            for (var c = 0; c < map.width; c++) {
                x = c * map.tilewidth - this.camera.x;
                y = - this.camera.y;
                this.context.beginPath();
                this.context.moveTo(x, y);
                this.context.lineTo(x, height);
                this.context.stroke();
            }
        }
    }
)