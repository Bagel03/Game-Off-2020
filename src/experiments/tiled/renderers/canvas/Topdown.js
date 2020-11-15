
namespace `experiments.tiled.renderers.canvas` (
    class Topdown {
        constructor(context,map){
            this.context=document.createElement('canvas').getContext('2d');
            this.map = map;
            this.context.canvas.width   = 500;
            this.context.canvas.height  = 500;
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
                        tileset.image, 
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